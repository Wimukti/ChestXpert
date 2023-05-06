import datetime
import matplotlib.pyplot as plt
import numpy as np
import streamlit as st
import tensorflow as tf
import io
import base64
import json
import webapp.streamlit.utils as utils
import streamlit.components.v1 as components
import cv2
import matplotlib.cm as cm
import model.encoder.evaluate as evaluate

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component
_header = components.declare_component(
    name="st_header",
    url=config['baseUrl'] + "/st-header"
)

_image_editor = components.declare_component(
    name="image_editor",
    url=config['baseUrl'] + "/image-editor"
)

_attention_map = components.declare_component(
    name="attention_map",
    url=config['baseUrl'] + "/attention-map"
)


def image_editor(upload_image):
    return _image_editor(upload_image=upload_image)


def attention_map(binary_maps, jet_maps, attention_maps, resized_img, report, classification, accuracy):
    return _attention_map(binary_maps=binary_maps,
                          jet_maps=jet_maps,
                          attention_maps=attention_maps,
                          resized_img=resized_img,
                          report=report,
                          classification=classification,
                          accuracy=accuracy)


def st_header(title, subtitle):
    return _header(title=title, subtitle=subtitle)



# Define a state to hold the objects
if 'upload_image' not in st.session_state:
    st.session_state['upload_image'] = None
if 'edited_image' not in st.session_state:
    st.session_state['edited_image'] = None
if 'attention_maps' not in st.session_state:
    st.session_state['attention_maps'] = None


def app():
    st_header(title='ChestXpert: Chest X-Ray Report Generation',
              subtitle='A Deep Learning based Chest X-Ray Report Generation System')
    st.write('''<span style="
                       font-size: calc(1.4rem + 1.8vw); 
                       font-weight: 700; 
                       font-weight: bold;">
                       Upload Your Chest X-Ray Image
                </span>''',
             unsafe_allow_html=True)

    st.set_option('deprecation.showfileUploaderEncoding', False)
    uploaded_file = st.file_uploader(
        'Choose a Chest X-Ray Image...', type=('png', 'jpg', 'jpeg'))

    if uploaded_file:
        # convert the image to bytes
        bytes_data = uploaded_file.getvalue()

        # convert to base64
        base64_bytes = base64.b64encode(bytes_data)
        base64_string = base64_bytes.decode()

        # save the image in the session state
        st.session_state.upload_image = base64_string

        # Streamlit.setComponentValue(data, dataScaled)
        image_data = image_editor(st.session_state.upload_image)

        if image_data is not None:

            # save edited_image in the session state
            st.session_state.edited_image = image_data

            # convert base64 to image
            img = base64.b64decode(st.session_state.edited_image.split(',')[1])
            img_array = np.frombuffer(img, dtype=np.uint8)
            img_array = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)

            # Read input image with size [1, H, W, 1] and range (0, 255)
            img_array = img_array[None, ..., None]

            # Convert image to float values in (0, 1)
            img_array = tf.image.convert_image_dtype(img_array, tf.float32)

            # Resize image with padding to [1, 224, 224, 1]
            img_array = tf.image.resize_with_pad(
                img_array, 224, 224, method=tf.image.ResizeMethod.BILINEAR)

            classification, accuracy = evaluate.classification_results(img_array)
            print("Predicted Class: ", classification)
            print("Accuracy: ", accuracy, "%")
            # Check image
            valid = tf.nn.sigmoid(
                st.session_state.cxr_validator_model(img_array))
            if valid < 0.1:
                st.info('Image is not a Chest X-ray')
                return

            # Log datetime
            print('[{}] Running Analysis...'
                  .format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

            # Generate radiology report
            with st.spinner('Generating report... Do not refresh or close window.'):
                result, attention_weights, tokens = utils.evaluate(img_array, st.session_state.tokenizer, st.session_state.transformer,
                                                                   st.session_state.temperature, st.session_state.top_k, st.session_state.top_p,
                                                                   st.session_state.options, st.session_state.seed)
                predicted_sentence = st.session_state.tokenizer.decode(result)
            st.session_state.predicted_sentence = predicted_sentence
            # Display generated text

            attn_map = attention_weights[0]  # squeeze
            if st.session_state == -1:  # average attention heads
                attn_map = tf.reduce_mean(attn_map, axis=0)
            else:  # select attention heads
                attn_map = attn_map[st.session_state.attention_head]
            attn_map = attn_map / attn_map.numpy().max() * 255

            st.session_state.attention_maps = attn_map
            attention_images = {}
            jet_images = {}
            binary_images = {}
            for i in range(tokens - 1):
                attn_token = attn_map[i, ...]
                attn_token = tf.reshape(attn_token, [7, 7])

                fig, ax = plt.subplots(1, 1)
                ax.set_title(st.session_state.tokenizer.decode(
                    [result.numpy()[i]]), fontsize=20)
                img2 = ax.imshow(np.squeeze(img_array))
                ax.imshow(attn_token, cmap='gray', alpha=0.6,
                          extent=img2.get_extent())
                ax.axis('off')

                # convert fig to bytes
                buffer = io.BytesIO()
                fig.canvas.print_png(buffer)
                plot_data = base64.b64encode(buffer.getvalue()).decode()

                # append plot data as value and token as key to attention_images
                attention_images[st.session_state.tokenizer.decode(
                    [result.numpy()[i]])] = plot_data

                # Jet Map
                # convert to dtype uint8
                jet_tokens = tf.cast(attn_token, tf.uint8)

                # get jet color map
                jet = cm.get_cmap('jet')

                # get binary color map
                binary = cm.get_cmap('binary_r')

                # color maps
                jet_colors = jet(np.arange(256))[:, :3]
                jet_heatmap = jet_colors[jet_tokens]
                binary_colors = binary(np.arange(256))[:, :3]
                binary_heatmap = binary_colors[jet_tokens]

                # read image from tf.keras.preprocessing.image.load_img
                img = tf.keras.preprocessing.image.load_img(
                    uploaded_file, target_size=(224, 224))
                img = tf.keras.preprocessing.image.img_to_array(img)

                # Create an image with attention map
                jet_heatmap = tf.keras.preprocessing.image.array_to_img(
                    jet_heatmap)
                jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
                jet_heatmap = tf.keras.preprocessing.image.img_to_array(
                    jet_heatmap)
                binary_heatmap = tf.keras.preprocessing.image.array_to_img(
                    binary_heatmap)
                binary_heatmap = binary_heatmap.resize(
                    (img.shape[1], img.shape[0]))
                binary_heatmap = tf.keras.preprocessing.image.img_to_array(
                    binary_heatmap)

                superimposed_jet_img = jet_heatmap * 0.6 + img * 0.4
                superimposed_jet_img = tf.keras.preprocessing.image.array_to_img(
                    superimposed_jet_img)
                # superimposed_jet_img.save(f'superimposed_img${i}.png')
                fig_jet, ax_jet = plt.subplots(1, 1)
                ax_jet.set_title(st.session_state.tokenizer.decode(
                    [result.numpy()[i]]), fontsize=20)
                ax_jet.imshow(np.squeeze(superimposed_jet_img))
                ax_jet.axis('off')

                superimposed_binary_img = binary_heatmap * 0.6 + img * 0.4
                superimposed_binary_img = tf.keras.preprocessing.image.array_to_img(
                    superimposed_binary_img)
                # superimposed_binary_img.save(f'superimposed_img${i}.png')
                fig_binary, ax_binary = plt.subplots(1, 1)
                ax_binary.set_title(st.session_state.tokenizer.decode(
                    [result.numpy()[i]]), fontsize=20)
                ax_binary.imshow(np.squeeze(superimposed_binary_img))
                ax_binary.axis('off')

                # convert fig to bytes
                buffer_jet = io.BytesIO()
                fig_jet.canvas.print_png(buffer_jet)
                plot_data_jet = base64.b64encode(
                    buffer_jet.getvalue()).decode()

                buffer_binary = io.BytesIO()
                fig_binary.canvas.print_png(buffer_binary)
                plot_data_binary = base64.b64encode(
                    buffer_binary.getvalue()).decode()

                # append plot data as value and token as key to jet_images
                jet_images[st.session_state.tokenizer.decode(
                    [result.numpy()[i]])] = plot_data_jet
                binary_images[st.session_state.tokenizer.decode(
                    [result.numpy()[i]])] = plot_data_binary

            # convert the image to bytes
            bytes_data = uploaded_file.getvalue()
            # convert to base64
            base64_bytes = base64.b64encode(bytes_data)
            base64_string = base64_bytes.decode()
            # save the image in the session state
            st.session_state.upload_image = base64_string

            # save the attention_images in the session state
            attention_images = json.dumps(attention_images)
            st.session_state.attention_maps = attention_images

            # save the jet_images in the session state
            jet_images = json.dumps(jet_images)
            binary_images = json.dumps(binary_images)

            # display attention maps using React component
            attention_map(binary_images, jet_images, st.session_state.attention_maps,
                          st.session_state.upload_image, st.session_state.predicted_sentence, classification, accuracy)
    else:
        print("No upload image")
