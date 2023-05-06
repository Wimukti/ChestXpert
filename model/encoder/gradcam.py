import tensorflow as tf
from vis.utils import utils
import matplotlib.pyplot as plt
import numpy as np
from vis.visualization import visualize_cam
import io
import base64


tf.compat.v1.disable_eager_execution()

def get_img_array(img_path, size):
    # `img` is a PIL image of size 448x448
    img = tf.keras.preprocessing.image.load_img(img_path, grayscale=True, target_size=size)
    # `array` is a float32 Numpy array of shape (448, 448, 1)
    array = tf.keras.preprocessing.image.img_to_array(img)
    # We add a dimension to transform our array into a "batch"
    # of size (1, 448, 448, 1)
    array = np.expand_dims(array, axis=0)
    # print(array.shape)
    return array

model = tf.keras.models.load_model('/Users/wimukthiindeewara/Desktop/dev/ChestXpert/weights/encoder.hdf5')
model = model.get_layer('densenet121')
layer_idx = utils.find_layer_idx(model, 'relu')
# model.layers[layer_idx].activation = keras.activations.linear
model = utils.apply_modifications(model)

img_path = '/Users/wimukthiindeewara/Desktop/dev/ChestXpert/effusion-right.jpeg'

penultimate_layer_idx = utils.find_layer_idx(model, "conv5_block16_concat")
class_idx  = None
seed_input = get_img_array(img_path, (224, 224))
grad_top1  = visualize_cam(model, layer_idx, class_idx, seed_input,
                           penultimate_layer_idx = penultimate_layer_idx,#None,
                           backprop_modifier     = None,
                           grad_modifier         = None)
_img = tf.keras.preprocessing.image.load_img(img_path, grayscale=True, target_size=(224, 224))

fig, ax = plt.subplots(1, 1)
ax.imshow(_img)
ax.imshow(grad_top1, cmap='jet', alpha=0.8)
ax.axis('off')

# convert fig to bytes
buffer = io.BytesIO()
fig.canvas.print_png(buffer)
plot_data = base64.b64encode(buffer.getvalue()).decode()



