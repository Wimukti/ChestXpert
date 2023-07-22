import tensorflow as tf

class GLFNet(tf.keras.layers.Layer):
    def __init__(self, d_model, dropout_rate=0.1):
        super().__init__()
        self.concat = tf.keras.layers.Concatenate(axis=-1)
        self.norm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dense1 = tf.keras.layers.Dense(d_model, activation='relu')
        self.norm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dropout = tf.keras.layers.Dropout(dropout_rate)
    
    def call(self, cnn_output, vit_output):
        combined = self.concat([cnn_output, vit_output])
        norm1_output = self.norm1(combined)
        dense1_output = self.dense1(norm1_output)
        norm2_output = self.norm2(dense1_output)
        output = self.dropout(norm2_output)
        return output
