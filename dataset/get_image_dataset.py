import os
import pandas as pd
import tensorflow as tf
import numpy as np
from dataset.helpers import parse_function, augmentation_fn, make_grayscale_fn

# set the root paths
train_test_validate_root = '/mimic'
dataset_root = '/MIMIC-CXR/mimic-cxr-jpg-2.0.0.physionet.org/'

# replace the -1 values of cheXpert classifier to 0 or 1
replaced_values = {float('nan'): 0, -1.0: 1}

###################################################################
##################### Train Dataset ###############################
###################################################################

# train dataset csv path
train_csv = os.path.join(train_test_validate_root, 'train.csv')

# get train dataset reports
train_reports = pd.read_csv(train_csv).replace(replaced_values).values

# get train dataset image paths
train_image_paths = [os.path.join(dataset_root, path)
                     for path in train_reports[:, 0]]

# get train dataset labels (class)
train_labels = np.uint8(train_reports[:, 2:])

# create train dataset
train_dataset = tf.data.Dataset.from_tensor_slices(
    (train_image_paths, train_labels))
train_dataset = train_dataset.shuffle(len(train_dataset))
train_dataset = train_dataset.map(
    parse_function, num_parallel_calls=tf.data.experimental.AUTOTUNE)
train_dataset = train_dataset.map(
    augmentation_fn, num_parallel_calls=tf.data.experimental.AUTOTUNE)
train_dataset = train_dataset.map(
    make_grayscale_fn, num_parallel_calls=tf.data.experimental.AUTOTUNE)
train_dataset = train_dataset.batch(32)

# prefetch the train dataset
train_dataset = train_dataset.prefetch(tf.data.experimental.AUTOTUNE)

##################################################################
##################### Test Dataset ###############################
##################################################################

# test dataset csv path
test_csv = os.path.join(train_test_validate_root, 'test.csv')

# get test dataset reports
test_reports = pd.read_csv(test_csv).replace(replaced_values).values

# get test dataset image paths
test_image_paths = [os.path.join(dataset_root, path)
                    for path in test_reports[:, 0]]

# get test dataset labels (class)
test_labels = np.uint8(test_reports[:, 2:])

# create test dataset
test_dataset = tf.data.Dataset.from_tensor_slices(
    (test_image_paths, test_labels))
test_dataset = test_dataset.map(
    parse_function, num_parallel_calls=tf.data.experimental.AUTOTUNE)
test_dataset = test_dataset.batch(16)

# prefetch the test dataset
test_dataset = test_dataset.prefetch(tf.data.experimental.AUTOTUNE)

##################################################################
##################### Validate Dataset ###########################
##################################################################

# validate dataset csv path
validate_csv = os.path.join(train_test_validate_root, 'validate.csv')

# get validate dataset reports
validate_reports = pd.read_csv(validate_csv).replace(replaced_values).values

# get validate dataset image paths
validate_image_paths = [os.path.join(
    dataset_root, path) for path in validate_reports[:, 0]]

# get validate dataset labels (class)
validate_labels = np.uint8(validate_reports[:, 2:])

# create validate dataset
validate_dataset = tf.data.Dataset.from_tensor_slices(
    (validate_image_paths, validate_labels))
validate_dataset = validate_dataset.map(
    parse_function, num_parallel_calls=tf.data.experimental.AUTOTUNE)
validate_dataset = validate_dataset.map(
    make_grayscale_fn, num_parallel_calls=tf.data.experimental.AUTOTUNE)
validate_dataset = validate_dataset.batch(16)

# prefetch the validate dataset
validate_dataset = validate_dataset.prefetch(tf.data.experimental.AUTOTUNE)


def get_train_dataset():
    return train_dataset


def get_test_dataset():
    return test_dataset


def get_validate_dataset():
    return validate_dataset
