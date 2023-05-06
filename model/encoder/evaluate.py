import tqdm
import numpy as np
import tensorflow as tf
from sklearn.metrics import f1_score, roc_curve, auc, accuracy_score,precision_recall_fscore_support
from matplotlib import pyplot

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

img_path = '/Users/wimukthiindeewara/Desktop/dev/ChestXpert/effusion-right.jpeg'
def get_img_array(img_path, size):
    img = tf.keras.preprocessing.image.load_img(img_path, grayscale=True, target_size=size)
    array = tf.keras.preprocessing.image.img_to_array(img)
    array = np.expand_dims(array, axis=0)
    return array

input = get_img_array(img_path, (224, 224))

model = tf.keras.models.load_model('/Users/wimukthiindeewara/Desktop/dev/ChestXpert/weights/encoder.hdf5')
y_pred = model.predict(input)
print(y_pred)
# get argmax for the prediction. If the argmax is 0 or 1, get the argmax from remaining elements
if np.argmax(y_pred) == 0 or np.argmax(y_pred) == 1:
    y_pred = np.argmax(y_pred[0][2:])
else:
    y_pred = np.argmax(y_pred[0][:2])

# print the predicted class
print(abnormalities[y_pred])