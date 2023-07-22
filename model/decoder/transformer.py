from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import datetime
import numpy as np
import tensorflow as tf
from transformers import TFAutoModel, AutoTokenizer

def default_hparams():
    return {
        'img_x': 224,
        'img_y': 224,
        'img_ch': 1,
        'd_model': 512,
        'dff': 2048,
        'num_heads': 8,
        'num_layers': 6,
        'dropout_rate': 0.1,
        'vit_pretrained_model': "google/vit-base-patch16-224-in21k",
        'cnn_pretrained_weights': None
    }

def positional_encoding(length, depth):
    depth = depth / 2

    positions = np.arange(length)[:, np.newaxis]  # (seq, 1)
    depths = np.arange(depth)[np.newaxis, :] / depth  # (1, depth)

    angle_rates = 1 / (10000 ** depths)  # (1, depth)
    angle_rads = positions * angle_rates  # (pos, depth)

    pos_encoding = np.concatenate(
        [np.sin(angle_rads), np.cos(angle_rads)],
        axis=-1)

    return tf.cast(pos_encoding, dtype=tf.float32)

class PositionalEmbedding(tf.keras.layers.Layer):
    def __init__(self, vocab_size, d_model):
        super().__init__()
        self.d_model = d_model
        self.embedding = tf.keras.layers.Embedding(vocab_size, d_model, mask_zero=True)
        self.pos_encoding = positional_encoding(length=2048, depth=d_model)

    def compute_mask(self, *args, **kwargs):
        return self.embedding.compute_mask(*args, **kwargs)

    def call(self, x):
        length = tf.shape(x)[1]
        x = self.embedding(x)
        # This factor sets the relative scale of the embedding and positional_encoding.
        x *= tf.math.sqrt(tf.cast(self.d_model, tf.float32))
        x = x + self.pos_encoding[tf.newaxis, :length, :]
        return x

class BaseAttention(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super().__init__()
        self.mha = tf.keras.layers.MultiHeadAttention(**kwargs)
        self.layernorm = tf.keras.layers.LayerNormalization()
        self.add = tf.keras.layers.Add()

class CrossAttention(BaseAttention):
    def call(self, x, context):
        attn_output, attn_scores = self.mha(
            query=x,
            key=context,
            value=context,
            return_attention_scores=True)

        # Cache the attention scores for plotting later.
        self.last_attn_scores = attn_scores

        x = self.add([x, attn_output])
        x = self.layernorm(x)

        return x

class GlobalSelfAttention(BaseAttention):
    def call(self, x):
        attn_output = self.mha(
            query=x,
            value=x,
            key=x)
        x = self.add([x, attn_output])
        x = self.layernorm(x)
        return x

class CausalSelfAttention(BaseAttention):
    def call(self, x):
        attn_output = self.mha(
            query=x,
            value=x,
            key=x,
            use_causal_mask=True)
        x = self.add([x, attn_output])
        x = self.layernorm(x)
        return x

class FeedForward(tf.keras.layers.Layer):
    def __init__(self, d_model, dff, dropout_rate=0.1):
        super().__init__()
        self.seq = tf.keras.Sequential([
            tf.keras.layers.Dense(dff, activation='relu'),
            tf.keras.layers.Dense(d_model),
            tf.keras.layers.Dropout(dropout_rate)
        ])
        self.add = tf.keras.layers.Add()
        self.layer_norm = tf.keras.layers.LayerNormalization()

    def call(self, x):
        x = self.add([x, self.seq(x)])
        x = self.layer_norm(x)
        return x

class DecoderLayer(tf.keras.layers.Layer):
    def __init__(self,
                 *,
                 d_model,
                 num_heads,
                 dff,
                 dropout_rate=0.1):
        super(DecoderLayer, self).__init__()

        self.causal_self_attention = CausalSelfAttention(
            num_heads=num_heads,
            key_dim=d_model,
            dropout=dropout_rate)

        self.cross_attention = CrossAttention(
            num_heads=num_heads,
            key_dim=d_model,
            dropout=dropout_rate)

        self.ffn = FeedForward(d_model, dff)

    def call(self, x, context):
        x = self.causal_self_attention(x=x)
        x = self.cross_attention(x=x, context=context)

        # Cache the last attention scores for plotting later
        self.last_attn_scores = self.cross_attention.last_attn_scores

        x = self.ffn(x)  # Shape `(batch_size, seq_len, d_model)`.
        return x

class Encoder(tf.keras.layers.Layer):
    def __init__(self, input_shape, vit_pretrained_model=None, cnn_pretrained_weights=None):
        super(Encoder, self).__init__()

        self.densenet121 = tf.keras.applications.DenseNet121(
            include_top=False, weights=cnn_pretrained_weights, input_shape=input_shape)
        self.vit_pretrained_model = vit_pretrained_model
        self.vit_feature_extractor, self.vit = self.create_vit()

        self.glfnet = GLFNet(d_model=self.vit.config.hidden_size)

    def create_vit(self):
        if self.vit_pretrained_model:
            feature_extractor = AutoTokenizer.from_pretrained(self.vit_pretrained_model)
            vit = TFAutoModel.from_pretrained(self.vit_pretrained_model)
        else:
            feature_extractor = AutoTokenizer.from_pretrained("google/vit-base-patch16-224-in21k")
            vit = TFAutoModel.from_pretrained("google/vit-base-patch16-224-in21k")
        return feature_extractor, vit

    def call(self, x):
        dense_features = self.densenet121(x)
        dense_features = tf.keras.layers.GlobalAveragePooling2D()(dense_features)
        dense_features = tf.keras.layers.Dense(1024, activation='relu')(dense_features)

        vit_features = self.vit_feature_extractor(x)
        vit_features = tf.keras.layers.GlobalAveragePooling2D()(vit_features['pixel_values'])
        vit_features = self.vit(vit_features)[0]
        vit_features = tf.keras.layers.Dense(1024, activation='relu')(vit_features)

        combined_features = tf.keras.layers.Concatenate()([dense_features, vit_features])
        return self.glfnet(combined_features)

class GLFNet(tf.keras.layers.Layer):
    def __init__(self, d_model, dropout_rate=0.1):
        super().__init__()
        self.concat = tf.keras.layers.Concatenate(axis=-1)
        self.norm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dense1 = tf.keras.layers.Dense(d_model, activation='relu')
        self.norm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dropout = tf.keras.layers.Dropout(dropout_rate)

    def call(self, x):
        combined = self.concat(x)
        norm1_output = self.norm1(combined)
        dense1_output = self.dense1(norm1_output)
        norm2_output = self.norm2(dense1_output)
        output = self.dropout(norm2_output)
        return output

class Decoder(tf.keras.layers.Layer):
    def __init__(self, *, num_layers, d_model, num_heads, dff, vocab_size,
                 dropout_rate=0.1):
        super(Decoder, self).__init__()

        self.d_model = d_model
        self.num_layers = num_layers

        self.pos_embedding = PositionalEmbedding(vocab_size=vocab_size,
                                                 d_model=d_model)
        self.dropout = tf.keras.layers.Dropout(dropout_rate)
        self.dec_layers = [
            DecoderLayer(d_model=d_model, num_heads=num_heads,
                         dff=dff, dropout_rate=dropout_rate)
            for _ in range(num_layers)]

        self.last_attn_scores = None

    def call(self, x, context):
        # `x` is token-IDs shape (batch, target_seq_len)
        x = self.pos_embedding(x)  # (batch_size, target_seq_len, d_model)

        x = self.dropout(x)

        for i in range(self.num_layers):
            x = self.dec_layers[i](x, context)

        self.last_attn_scores = self.dec_layers[-1].last_attn_scores

        # The shape of x is (batch_size, target_seq_len, d_model).
        return x

class Transformer(tf.keras.Model):
    def __init__(self, num_layers, d_model, num_heads, dff,
                 target_vocab_size, dropout_rate=0.1, input_shape=(224, 224, 1),
                 classifier_weights=None, vit_pretrained_model=None, cnn_pretrained_weights=None):
        super(Transformer, self).__init__()

        self.encoder = Encoder(input_shape=input_shape,
                               vit_pretrained_model=vit_pretrained_model,
                               cnn_pretrained_weights=cnn_pretrained_weights)

        self.decoder = Decoder(num_layers=num_layers, d_model=d_model,
                               num_heads=num_heads, dff=dff,
                               vocab_size=target_vocab_size,
                               dropout_rate=dropout_rate)

        self.final_layer = tf.keras.layers.Dense(target_vocab_size)

    def call(self, inputs):
        # To use a Keras model with `.fit` you must pass all your inputs in the
        # first argument.
        context, x = inputs

        context = self.encoder(context)  # (batch_size, context_len, d_model)

        x = self.decoder(x, context)  # (batch_size, target_len, d_model)

        # Final linear layer output.
        logits = self.final_layer(x)  # (batch_size, target_len, target_vocab_size)

        try:
            # Drop the keras mask, so it doesn't scale the losses/metrics.
            # b/250038731
            del logits._keras_mask
        except AttributeError:
            pass

        # Return the final output and the attention weights.
        return logits

if __name__ == "__main__":
    hparams = default_hparams()

    transformer = Transformer(
        num_layers=hparams['num_layers'],
        d_model=hparams['d_model'],
        num_heads=hparams['num_heads'],
        dff=hparams['dff'],
        target_vocab_size=2048,
        dropout_rate=hparams['dropout_rate'],
        input_shape=(hparams['img_x'], hparams['img_y'], hparams['img_ch']),
        vit_pretrained_model=hparams['vit_pretrained_model'],
        cnn_pretrained_weights=hparams['cnn_pretrained_weights']
    )

    a = 1

    image = np.random.rand(1, 224, 224, 1).astype('float32')
    text = np.random.randint(0, 2048, size=(1, 27))

    output = transformer((image, text))
