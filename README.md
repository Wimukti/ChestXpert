# ChestXpert
ChestXpert is a web application that uses transformers to generate medical reports based on uploaded chest X-ray images. This repository contains the code for the model and the Streamlit web application.

</br><img src="https://github.com/Wimukti/ChestXpert/blob/main/assets/ChestXpert%20logo.gif" width="50%" />

# Model
The ChestXpert model uses an encoder-decoder architecture based on the Transformer architecture. The encoder takes in the chest X-ray image as input and generates a feature vector, which is then passed to the decoder to generate the corresponding medical report.

# Installation
To run ChestXpert on your local machine, you need to have Python 3.6 or higher installed. You can then install the required dependencies by running the following command:

`pip install -r requirements.txt`

This will install all the necessary packages, including PyTorch, Transformers, and Streamlit.

# Usage
To launch the ChestXpert web application, navigate to the project directory and run the following command:
`streamlit run app.py`

This will launch a local web server that you can access in your browser at http://localhost:8501.

To generate a medical report, simply upload a chest X-ray image using the "Upload Image" button. The model will automatically generate a report based on the image.


