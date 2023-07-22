import tensorflow as tf
from transformers import ViTFeatureExtractor, TFAutoModel

def create_vit(input_shape, pretrained_model_name=None):
    if pretrained_model_name:
        feature_extractor = ViTFeatureExtractor.from_pretrained(pretrained_model_name)
        vit = TFAutoModel.from_pretrained(pretrained_model_name)
    else:
        feature_extractor = ViTFeatureExtractor.from_pretrained("google/vit-base-patch16-224-in21k")
        vit = TFAutoModel.from_pretrained("google/vit-base-patch16-224-in21k")
    return feature_extractor, vit
