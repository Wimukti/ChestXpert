import numpy as np
import tensorflow as tf


def positional_encoding(length, depth):
    depth = depth / 2

    # get the positions of each word in the sentence
    positions = np.arange(length)[:, np.newaxis]

    # get the depths of each word in the sentence
    depths = np.arange(depth)[np.newaxis, :] / depth

    # get the angle rates of each word in the sentence
    angle_rates = 1 / (10000 ** depths)
    angle_rads = positions * angle_rates

    # get the positional encoding
    pos_encoding = np.concatenate(
        [np.sin(angle_rads), np.cos(angle_rads)], axis=-1)

    return tf.cast(pos_encoding, dtype=tf.float32)


class PositionalEmbedding(tf.keras.layers.Layer):
    def __init__(self, vocab_size, d_model):
        super().__init__()
        self.d_model = d_model
        self.embedding = tf.keras.layers.Embedding(
            vocab_size, d_model, mask_zero=True)
        self.positional_encoding = positional_encoding(
            length=2048, depth=d_model)

    def compute_mask(self, *args, **kwargs):
        return self.embedding.compute_mask(*args, **kwargs)

    def call(self, x):
        length = tf.shape(x)[1]
        x = self.embedding(x)

        # This factor sets the relative scale of the embedding and positonal_encoding.
        x *= tf.math.sqrt(tf.cast(self.d_model, tf.float32))

        # add the positional encoding to the embedding
        x = x + self.positional_encoding[tf.newaxis, :length, :]

        return x
