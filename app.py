from flask import Flask, request, jsonify
import json
import base64
import tqdm
import datetime
from skimage import io as skio
import matplotlib.pyplot as plt
import numpy as np
import io
import tensorflow as tf
import matplotlib.cm as cm
from model.transformer import Transformer, default_hparams
from tokenizers import ByteLevelBPETokenizer
from flask_cors import CORS, cross_origin



app = Flask(__name__)

def load_validator():
    validator_model = tf.keras.models.load_model('checkpoints/cxr_validator_model.tf')
    print('Validator Model Loaded!')
    return validator_model


def load_model():
    tokenizer = ByteLevelBPETokenizer(
        'preprocessing/mimic/mimic-vocab.json',
        'preprocessing/mimic/mimic-merges.txt',
    )

    target_vocab_size = tokenizer.get_vocab_size()
    dropout_rate = 0.1
    num_layers = 6
    d_model = 512
    dff = 2048
    num_heads = 8

    transformer = Transformer(num_layers, d_model, num_heads, dff,
                              target_vocab_size=target_vocab_size,
                              dropout_rate=dropout_rate)

    transformer.load_weights('checkpoints/RATCHET.tf')
    print(f'Model Loaded! Checkpoint file: checkpoints/RATCHET.tf')

    return transformer, tokenizer


def top_k_logits(logits, k):
    if k == 0:
        return logits

    def _top_k():
        values, _ = tf.nn.top_k(logits, k=k)
        min_values = values[:, -1, tf.newaxis]
        return tf.where(
            logits < min_values,
            tf.ones_like(logits, dtype=logits.dtype) * -1e10,
            logits,
        )
    return tf.cond(
       tf.equal(k, 0),
       lambda: logits,
       lambda: _top_k(),
    )


def top_p_logits(logits, p):
    batch, _ = logits.shape.as_list()
    sorted_logits = tf.sort(logits, direction='DESCENDING', axis=-1)
    cumulative_probs = tf.cumsum(tf.nn.softmax(sorted_logits, axis=-1), axis=-1)
    indices = tf.stack([
        tf.range(0, batch),
        tf.maximum(tf.reduce_sum(tf.cast(cumulative_probs <= p, tf.int32), axis=-1) - 1, 0),
    ], axis=-1)
    min_values = tf.gather_nd(sorted_logits, indices)
    return tf.where(
        logits < min_values,
        tf.ones_like(logits) * -1e10,
        logits,
    )


def evaluate(inp_img, tokenizer, transformer, temperature, top_k, top_p, options, seed, MAX_LENGTH=128):

    # The first token to the transformer should be the start token
    output = tf.convert_to_tensor([[tokenizer.token_to_id('<s>')]])

    for i in tqdm.tqdm(range(MAX_LENGTH)):

        # predictions.shape == (batch_size, seq_len, vocab_size)
        predictions = transformer([inp_img, output], training=False)

        # select the last word from the seq_len dimension
        predictions = predictions[:, -1, :] / temperature  # (batch_size, vocab_size)
        predictions = top_k_logits(predictions, k=top_k)
        predictions = top_p_logits(predictions, p=top_p)

        if options == 'Greedy':
            predicted_id = tf.cast(tf.argmax(predictions, axis=-1), tf.int32)[:, tf.newaxis]
        elif options == 'Sampling':
            predicted_id = tf.random.categorical(predictions, num_samples=1, dtype=tf.int32, seed=seed)
        else:
            raise ValueError('Invalid option selected.')

        # return the result if the predicted_id is equal to the end token
        if predicted_id == 2:  # stop token #tokenizer_en.vocab_size + 1:
            break

        # concatentate the predicted_id to the output which is given to the decoder
        # as its input.
        output = tf.concat([output, predicted_id], axis=-1)

    # transformer([inp_img, output[:, :-1]], training=False)
    return tf.squeeze(output, axis=0)[1:], transformer.decoder.last_attn_scores


transformer, tokenizer = load_model()
cxr_validator_model = load_validator()

def get_report(img, tokenizer, transformer, temperature, top_k, top_p, options, seed, file):
    result, attention_weights = evaluate(img, tokenizer, transformer,
                                         temperature, top_k, top_p,
                                         options, seed)
    report = tokenizer.decode(result)
    attention_maps = get_attention_map(result,attention_weights, img, file)

    return report, attention_maps

def get_attention_map(result, attention_weights,img_array,uploaded_file, attention_head=-1):
    attn_map = attention_weights[0]  # squeeze
    if attention_head == -1:  # average attention heads
        attn_map = tf.reduce_mean(attn_map, axis=0)
    else:  # select attention heads
        attn_map = attn_map[attention_head]
    attn_map = attn_map / attn_map.numpy().max() * 255

    attention_images = {}
    jet_images = {}
    binary_images = {}

    for i in range(attn_map.shape[0] - 1):
        attn_token = attn_map[i, ...]
        attn_token = tf.reshape(attn_token, [7, 7])

        fig, ax = plt.subplots(1, 1)
        ax.set_title(tokenizer.decode(
            [result.numpy()[i]]), fontsize=20)
        img2 = ax.imshow(np.squeeze(img_array))
        ax.imshow(attn_token, cmap='gray', alpha=0.6,
                  extent=img2.get_extent())
        ax.axis('off')

        # convert fig to bytes
        buffer = io.BytesIO()
        fig.canvas.print_png(buffer)
        plot_data = base64.b64encode(buffer.getvalue()).decode()

        # append plot data as value and token as key to attention_images
        attention_images[tokenizer.decode(
            [result.numpy()[i]])] = plot_data
        # convert to dtype uint8
        jet_tokens = tf.cast(attn_token, tf.uint8)

        # get jet color map
        jet = cm.get_cmap('jet')

        # get binary color map
        binary = cm.get_cmap('binary_r')

        # color maps
        jet_colors = jet(np.arange(256))[:, :3]
        jet_heatmap = jet_colors[jet_tokens]
        binary_colors = binary(np.arange(256))[:, :3]
        binary_heatmap = binary_colors[jet_tokens]

        # read image from tf.keras.preprocessing.image.load_img
        img = uploaded_file

        jet_heatmap = tf.keras.preprocessing.image.array_to_img(
            jet_heatmap)
        jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
        jet_heatmap = tf.keras.preprocessing.image.img_to_array(
            jet_heatmap)
        binary_heatmap = tf.keras.preprocessing.image.array_to_img(
            binary_heatmap)
        binary_heatmap = binary_heatmap.resize(
            (img.shape[1], img.shape[0]))
        binary_heatmap = tf.keras.preprocessing.image.img_to_array(
            binary_heatmap)

        superimposed_jet_img = jet_heatmap * 0.6 + img * 0.4
        # superimposed_jet_img.save(f'superimposed_img${i}.png')
        fig_jet, ax_jet = plt.subplots(1, 1)
        ax_jet.set_title(tokenizer.decode(
            [result.numpy()[i]]), fontsize=20)
        ax_jet.imshow(np.squeeze(superimposed_jet_img))
        ax_jet.axis('off')

        superimposed_binary_img = binary_heatmap * 0.6 + img * 0.4
        # superimposed_binary_img.save(f'superimposed_img${i}.png')
        fig_binary, ax_binary = plt.subplots(1, 1)
        ax_binary.set_title(tokenizer.decode(
            [result.numpy()[i]]), fontsize=20)
        ax_binary.imshow(np.squeeze(superimposed_binary_img))
        ax_binary.axis('off')

        # convert fig to bytes
        buffer_jet = io.BytesIO()
        fig_jet.canvas.print_png(buffer_jet)
        plot_data_jet = base64.b64encode(
            buffer_jet.getvalue()).decode()

        buffer_binary = io.BytesIO()
        fig_binary.canvas.print_png(buffer_binary)
        plot_data_binary = base64.b64encode(
            buffer_binary.getvalue()).decode()

        # append plot data as value and token as key to jet_images
        jet_images[tokenizer.decode(
            [result.numpy()[i]])] = plot_data_jet
        binary_images[tokenizer.decode(
            [result.numpy()[i]])] = plot_data_binary

    # save the attention_images in the session state
    attention_images = json.dumps(attention_images)

    # save the jet_images in the session state
    jet_images = json.dumps(jet_images)
    binary_images = json.dumps(binary_images)

    return [attention_images, jet_images, binary_images]


cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@cross_origin()
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({
        'report': "HEllo"
        # 'attention_map': output_buffer.getvalue()
        })

@cross_origin()
@app.route('/generate_report', methods=['POST'])
def generate_report():
    file = request.files['image']
    upload = skio.imread(file, as_gray=True)[None, ..., None]
    img = tf.image.convert_image_dtype(upload, tf.float32)
    img = tf.image.resize_with_pad(img, 224, 224, method=tf.image.ResizeMethod.BILINEAR)

    valid = tf.nn.sigmoid(cxr_validator_model(img))
    if valid < 0.1:
        return jsonify({'error': 'Image is not a Chest X-ray'})

    temperature = float(request.form.get('temperature', 1.0))
    top_k = int(request.form.get('top_k', 6))
    top_p = float(request.form.get('top_p', 1.0))
    options = request.form.get('options', 'Greedy')
    seed = int(request.form.get('seed', 42))

    if (options != "Greedy" or options != "Sampling"):
        options = "Greedy"

    report, attention_maps = get_report(img, tokenizer, transformer, temperature, top_k, top_p, options, seed, img)


    return jsonify({
        'report': report,
        'attention_map': attention_maps[0],
        'jet_images': attention_maps[1],
        'binary_images': attention_maps[2],
        'accuracy': '25.35',
        'prediction': 'prediction'
    })


if __name__ == '__main__':
    app.run()
