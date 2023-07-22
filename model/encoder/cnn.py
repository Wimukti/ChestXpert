import tensorflow as tf
from tensorflow.keras.applications import DenseNet121

def create_cnn(input_shape, weights=None):
    cnn = DenseNet121(include_top=False, weights=weights, input_shape=input_shape)
    return cnn
