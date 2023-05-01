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

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# Define a state to hold the uploaded image
session = st.session_state

# React Component
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

def attention_map(attention_maps, resized_img):
    print('attention_maps', attention_maps)
    print('resized_img', resized_img)
    return _attention_map(attention_maps=attention_maps, resized_img=resized_img)

# Define a state to hold the objects
if 'upload_image' not in st.session_state:
    st.session_state['upload_image'] = None
if 'edited_image' not in st.session_state:
    st.session_state['edited_image'] = None
if 'attention_maps' not in st.session_state:
    st.session_state['attention_maps'] = None

def app():

    # Load models
    transformer, tokenizer = utils.load_model()
    cxr_validator_model = utils.load_validator()

    st.title('Upload Chest X-Ray Image')
    st.sidebar.title('Advanced Configuration')

    options = st.sidebar.selectbox('Generation Method', ('Sampling', 'Greedy'))
    seed = st.sidebar.number_input('Sampling Seed:', value=42)
    temperature = st.sidebar.number_input('Temperature', value=1.)
    top_k = st.sidebar.slider('top_k', min_value=0, max_value=tokenizer.get_vocab_size(), value=6, step=1)
    top_p = st.sidebar.slider('top_p', min_value=0., max_value=1., value=1., step=0.01)
    attention_head = st.sidebar.slider('attention_head', min_value=-1, max_value=7, value=-1, step=1)

    st.set_option('deprecation.showfileUploaderEncoding', False)
    uploaded_file = st.file_uploader('Choose an image...', type=('png', 'jpg', 'jpeg'))

    if uploaded_file:
        # convert the image to bytes
        bytes_data = uploaded_file.getvalue()

        # convert to base64
        base64_bytes = base64.b64encode(bytes_data)
        base64_string = base64_bytes.decode()

        # save the image in the session state
        session.upload_image = base64_string

        # Streamlit.setComponentValue(data, dataScaled)
        image_data = image_editor(session.upload_image)

        if image_data is not None:
            # save edited_image in the session state
            session.edited_image = image_data

            # display the image 200x200
            st.image(session.edited_image, width=250)

        if session.edited_image is not None:
            # convert base64 to image
            img = base64.b64decode(session.edited_image.split(',')[1])
            img_array = np.frombuffer(img, dtype=np.uint8)
            img_array = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)

            # Read input image with size [1, H, W, 1] and range (0, 255)
            img_array = img_array[None, ..., None]

            # Convert image to float values in (0, 1)
            img_array = tf.image.convert_image_dtype(img_array, tf.float32)

            # Resize image with padding to [1, 224, 224, 1]
            img_array = tf.image.resize_with_pad(img_array, 224, 224, method=tf.image.ResizeMethod.BILINEAR)

            # Check image
            valid = tf.nn.sigmoid(cxr_validator_model(img_array))
            if valid < 0.1:
                st.info('Image is not a Chest X-ray')
                return

            # Log datetime
            print('[{}] Running Analysis...'
                  .format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

            # Generate radiology report
            with st.spinner('Generating report... Do not refresh or close window.'):
                result, attention_weights, tokens = utils.evaluate(img_array, tokenizer, transformer,
                                                     temperature, top_k, top_p,
                                                     options, seed)
                predicted_sentence = tokenizer.decode(result)

            # Display generated text
            st.subheader('Generated Report:')
            st.write(predicted_sentence)
            # st.info(predicted_sentence)
            st.subheader('Attention Plot:')

            attn_map = attention_weights[0]  # squeeze
            if attention_head == -1:  # average attention heads
                attn_map = tf.reduce_mean(attn_map, axis=0)
            else:  # select attention heads
                attn_map = attn_map[attention_head]
            attn_map = attn_map / attn_map.numpy().max() * 255

            session.attention_maps = attn_map
            attention_images = {}
            for i in range(tokens - 1):
                attn_token = attn_map[i, ...]
                attn_token = tf.reshape(attn_token, [7, 7])

                fig, ax = plt.subplots(1, 1)
                ax.set_title(tokenizer.decode([result.numpy()[i]]), fontsize=20)
                img2 = ax.imshow(np.squeeze(img_array))
                ax.imshow(attn_token, cmap='gray', alpha=0.6, extent=img2.get_extent())
                ax.axis('off')

                # convert fig to bytes
                buffer = io.BytesIO()
                fig.canvas.print_png(buffer)
                plot_data = base64.b64encode(buffer.getvalue()).decode()

                # append plot data as value and token as key to attention_images
                attention_images[tokenizer.decode([result.numpy()[i]])] = plot_data

            # convert fig to bytes
            # convert the image to bytes
            bytes_data = uploaded_file.getvalue()
            # convert to base64
            base64_bytes = base64.b64encode(bytes_data)
            base64_string = base64_bytes.decode()
            # save the image in the session state
            session.upload_image = base64_string

            # save the attention_images in the session state
            attention_images = json.dumps(attention_images)
            session.attention_maps = attention_images

            # display attention maps using React component
            attention_map(session.attention_maps, session.upload_image)

            # Run again?
            st.button('Regenerate Report')
    else:
        print("No upload image")