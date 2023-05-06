import numpy as np
import tensorflow as tf
import streamlit as st

# class names of the dataset,  No finding means healthy chest X-ray
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
    encoder_model = st.session_state.encoder_model
    y_pred = encoder_model.predict(input)

    # get argmax for the prediction. If the argmax is 0 or 1, get the argmax from remaining elements
    # if np.argmax(y_pred) == 0 or np.argmax(y_pred) == 1:
    #     index = np.argmax(y_pred[0][2:])
    # else:
    #     index = np.argmax(y_pred[0][:2])
    index = np.argmax(y_pred)
    # print the predicted class
    classification = abnormalities[index]
    accuracy = y_pred[0][index]

    accuracy = accuracy * 100
    accuracy = round(accuracy, 2)
    return classification, accuracy


