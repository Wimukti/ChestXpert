# ChestXpert
ChestXpert is a web application that uses transformers to generate medical reports based on uploaded chest X-ray images. This repository contains the code for the model and the backend API.

# Model
The ChestXpert model uses an encoder-decoder architecture based on the Transformer architecture. The encoder consists of a DenseNet121 CNN, a Vision Transformer (ViT), and a Global Local Fusion Network (GLFNet). The CNN processes the input chest X-ray image, while the ViT handles the text input (medical report tokens). The GLFNet then fuses the visual and textual embeddings to generate the final feature vector for the decoder. The decoder is based on the transformer architecture and takes the fused feature vector to generate the corresponding medical report.

# Dataset
The ChestXpert model is trained on the MIMIC-CXR dataset, which is a large publicly available dataset of chest X-ray images and their associated medical reports. The MIMIC-CXR dataset contains over 350,000 chest X-ray images obtained from more than 65,000 patients.

## Data Preprocessing
Before using the MIMIC-CXR dataset for training, it undergoes several preprocessing steps to prepare it for the encoder-decoder model:

### Image Preprocessing: 
The chest X-ray images are resized and normalized to a common size (e.g., 224x224 pixels) and converted to grayscale.

### Text Preprocessing: 
The medical reports are tokenized into words and encoded using a tokenizer to represent them as numerical sequences.

### Paired Data: The dataset consists of paired examples, where each chest X-ray image is associated with its corresponding medical report. These pairs are used to train the encoder-decoder model.

## Data Split
To evaluate the performance of the ChestXpert model, the MIMIC-CXR dataset is divided into the following subsets:

### Training Set: 
This subset contains a majority of the data (e.g., 80% of the dataset) and is used to train the encoder-decoder model.

### Validation Set: 
This subset (e.g., 10% of the dataset) is used for hyperparameter tuning and to monitor the model's performance during training.

### Test Set: 
This subset (e.g., 10% of the dataset) is used to evaluate the final performance of the trained model on unseen data.

# Installation
To run ChestXpert on your local machine, you need to have Python 3.6 or higher installed. You can then install the required dependencies by running the following command:
    
    pip install -r requirements.txt

This will install all the necessary packages, including TensorFlow, Transformers, and Flask.

# Training
To train the ChestXpert model, you can use the train.py script located in the model/decoder directory. This script trains the encoder-decoder model on the provided dataset, and you can adjust the hyperparameters and loss function based on your specific task.

# Evaluation
To evaluate the trained model, you can use the evaluate.py script located in the model/decoder directory. This script takes a chest X-ray image as input and generates a medical report using the trained model.

# Usage
To launch the ChestXpert web application, navigate to the project directory and run the following command:
    
        python app.py

This will launch a local web server that you can access in your browser at http://localhost:5000.

To generate a medical report using the web application, simply upload a chest X-ray image using the "Upload Image" button. The model will automatically generate a report based on the image and display it on the web page.

# API
ChestXpert also provides a backend API for generating medical reports using the trained model. The API is built with Flask and SocketIO to handle image upload and report generation asynchronously. You can use the API by making a POST request to the appropriate endpoint with the chest X-ray image as the request payload.

# Contributors
 - Wimukthi Indeewara - wimukthi@chestxpert.live
 - Kasun Rathnayake - kasun@chestxpert.live
 - Mahela Pradeep - mahela@chestxpert.live