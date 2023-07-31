import tensorflow as tf
from .cnn import create_cnn
from .vision_transformer import create_vit
from .glfnet import GLFNet

def create_encoder(input_shape, vit_pretrained_model=None, cnn_pretrained_weights=None):
    cnn = create_cnn(input_shape, cnn_pretrained_weights)
    feature_extractor, vit = create_vit(input_shape, vit_pretrained_model)
    glfnet = GLFNet(d_model=vit.config.hidden_size)
    
    image_input = tf.keras.Input(shape=input_shape)
    text_input = tf.keras.Input(shape=(None,), dtype=tf.int32)
    
    cnn_output = cnn(image_input)
    vit_output = vit(image_input)
    glfnet_output = glfnet(cnn_output, vit_output)
    
    return tf.keras.Model(inputs=[image_input, text_input], outputs=glfnet_output)
