import streamlit as st
import tensorflow as tf
import tqdm
from model.decoder.transformer import Transformer
from tokenizers import ByteLevelBPETokenizer
import json

@st.cache_resource
def load_validator():
    validator_model = tf.keras.models.load_model('weights/validate.tf')
    print('Validator Model Loaded!')
    return validator_model

@st.cache_resource
def load_encoder():
    encoder_model = tf.keras.models.load_model('weights/encoder.hdf5')
    print('Encoder Model Loaded!')
    return encoder_model

@st.cache_resource
def load_model():

    # Load Tokenizer
    tokenizer = ByteLevelBPETokenizer(
        'dataset/mimic-vocab.json',
        'dataset/mimic-merges.txt',
    )

    # Load Model
    with open('model/decoder/hyper_parameters.json') as params:
        hparams = json.load(params)
    transformer = Transformer(
        num_layers=hparams['num_layers'],
        d_model=hparams['d_model'],
        num_heads=hparams['num_heads'],
        dff=hparams['dff'],
        target_vocab_size=tokenizer.get_vocab_size(),
        dropout_rate=hparams['dropout_rate'])
    transformer.load_weights('weights/model.tf')
    print(f'Model Loaded! Checkpoint file: weights/model.tf')

    return transformer, tokenizer

def top_k_logits(logits, k):
    if k == 0:
        # no truncation
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
    """Nucleus sampling"""
    batch, _ = logits.shape.as_list()
    sorted_logits = tf.sort(logits, direction='DESCENDING', axis=-1)
    cumulative_probs = tf.cumsum(tf.nn.softmax(sorted_logits, axis=-1), axis=-1)
    indices = tf.stack([
        tf.range(0, batch),
        # number of indices to include
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

    my_bar = st.progress(0)
    for i in tqdm.tqdm(range(MAX_LENGTH)):
        my_bar.progress(i/MAX_LENGTH)

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
            st.write('SHOULD NOT HAPPEN')

        # return the result if the predicted_id is equal to the end token
        if predicted_id == 2:  # stop token #tokenizer_en.vocab_size + 1:
            my_bar.empty()
            break

        # concatentate the predicted_id to the output which is given to the decoder
        # as its input.
        output = tf.concat([output, predicted_id], axis=-1)

    my_bar.empty()

    # transformer([inp_img, output[:, :-1]], training=False)
    return tf.squeeze(output, axis=0)[1:], transformer.decoder.last_attn_scores, i