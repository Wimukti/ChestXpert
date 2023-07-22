import numpy as np
import tensorflow as tf
import streamlit as st
from model.decoder.transformer import Transformer, default_hparams

# Class names of the dataset, No finding means a healthy chest X-ray
abnormalities = [
    'No Finding',
    'Enl. C. med.',
    'Cardiomegaly',
    'Lung Lesion',
    'Lung Opacity',
    'Edema',
    'Consolidation',
    'Pneumonia',
    'Atelectasis',
    'Pneumothorax',
    'Pleural Effusion',
    'Pleural Other',
    'Fracture',
    'Support Devices'
]

def get_img_array(img_path, size):
    img = tf.keras.preprocessing.image.load_img(img_path, grayscale=True, target_size=size)
    array = tf.keras.preprocessing.image.img_to_array(img)
    array = np.expand_dims(array, axis=0)
    return array

def classification_results(input):
    transformer = Transformer(
        num_layers=default_hparams['num_layers'],
        d_model=default_hparams['d_model'],
        num_heads=default_hparams['num_heads'],
        dff=default_hparams['dff'],
        target_vocab_size=2048,
        dropout_rate=default_hparams['dropout_rate'],
        input_shape=(default_hparams['img_x'], default_hparams['img_y'], default_hparams['img_ch']),
        vit_pretrained_model=default_hparams['vit_pretrained_model'],
        cnn_pretrained_weights=default_hparams['cnn_pretrained_weights']
    )
    
    encoder_weights_path = 'encoder_checkpoints/weights-improvement-epoch.hdf5'  # Provide the appropriate epoch number
    transformer.load_weights(encoder_weights_path)
    
    y_pred = transformer(input)

    index = np.argmax(y_pred)
    classification = abnormalities[index]
    accuracy = y_pred[0][index]

    accuracy = accuracy * 100
    accuracy = round(accuracy, 2)
    return classification, accuracy
