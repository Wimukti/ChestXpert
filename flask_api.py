# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import base64
from io import BytesIO
import tensorflow as tf
import json
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.cm as cm
import io

from model.encoder.encoder import create_encoder
from model.decoder.transformer import Transformer, default_hparams
from tokenizers import ByteLevelBPETokenizer

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the new encoder and tokenizer
encoder = create_encoder(input_shape=(224, 224, 1), vit_pretrained_model="google/vit-base-patch16-224-in21k")
encoder.load_weights('encoder_checkpoints/weights-improvement-10-0.95.hdf5')

tokenizer = ByteLevelBPETokenizer(
    'preprocessing/mimic/mimic-vocab.json',
    'preprocessing/mimic/mimic-merges.txt',
)

# Load the new transformer model
hparams = default_hparams()
transformer = Transformer(
    num_layers=hparams['num_layers'],
    d_model=hparams['d_model'],
    num_heads=hparams['num_heads'],
    dff=hparams['dff'],
    target_vocab_size=tokenizer.get_vocab_size(),
    dropout_rate=hparams['dropout_rate']
)
transformer.load_weights('checkpoints/RATCHET.tf')

@app.route('/generate_report', methods=['POST'])
def generate_report():
    try:
        data = request.get_json()
        image_base64 = data['image']
        top_k = int(data.get('top_k', 6))
        options = data.get('options', 'Greedy')
        seed = int(data.get('seed', 42))
        temperature = float(data.get('temperature', 1.0))
        top_p = float(data.get('top_p', 1.0))
        attention_head = int(data.get('attention_head', -1))

        # Decode base64 image
        image_bytes = base64.b64decode(image_base64)
        image = tf.image.decode_image(image_bytes, channels=1)
        image = tf.image.convert_image_dtype(image, tf.float32)
        image = tf.image.resize_with_pad(image, 224, 224)
        img_array = tf.expand_dims(image, axis=0)

        # Generate report and attention maps
        report, attention_images, jet_images, binary_images = main(img_array, options, seed, temperature, top_k, top_p, attention_head)

        return jsonify({
            'report': report,
            'attention_map': attention_images,
            'jet_images': jet_images,
            'binary_images': binary_images
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def top_k_logits(logits, k):
    values, _ = tf.nn.top_k(logits, k=k)
    min_values = values[:, -1, tf.newaxis]
    return tf.where(logits < min_values, tf.ones_like(logits) * -1e10, logits)

def top_p_logits(logits, p):
    batch, _ = logits.shape.as_list()
    sorted_logits = tf.sort(logits, direction='DESCENDING', axis=-1)
    cumulative_probs = tf.cumsum(tf.nn.softmax(sorted_logits, axis=-1), axis=-1)
    indices = tf.stack([
        tf.range(0, batch),
        tf.maximum(tf.reduce_sum(tf.cast(cumulative_probs <= p, tf.int32), axis=-1) - 1, 0),
    ], axis=-1)
    min_values = tf.gather_nd(sorted_logits, indices)
    return tf.where(logits < min_values, tf.ones_like(logits) * -1e10, logits)

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
            print('Invalid option!')

        # return the result if the predicted_id is equal to the end token
        if predicted_id == 2:  # stop token #tokenizer_en.vocab_size + 1:
            break

        # concatentate the predicted_id to the output which is given to the decoder
        # as its input.
        output = tf.concat([output, predicted_id], axis=-1)

    # transformer([inp_img, output[:, :-1]], training=False)
    return tf.squeeze(output, axis=0)[1:], transformer.decoder.last_attn_scores, i

def main(inp_img, options='Greedy', seed=42, temperature=1., top_k=6, top_p=1., attention_head=-1):
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
            print('Invalid option!')

        # return the result if the predicted_id is equal to the end token
        if predicted_id == 2:  # stop token #tokenizer_en.vocab_size + 1:
            break

        # concatentate the predicted_id to the output which is given to the decoder
        # as its input.
        output = tf.concat([output, predicted_id], axis=-1)

    # transformer([inp_img, output[:, :-1]], training=False)
    return tf.squeeze(output, axis=0)[1:], transformer.decoder.last_attn_scores, i

if __name__ == '__main__':
    app.run(debug=True)
