import os
import tensorflow as tf
import numpy as np
import pandas as pd
from tokenizers import ByteLevelBPETokenizer
from dataset.helpers import parse_function, augmentation_fn, make_grayscale_fn


def get_dataset(dataset_csv_root_loc,
                      vocabulary_root_loc,
                      mimic_cxr_root_loc,
                      seq_max_length=128,
                      batch_size=16,
                      n_threads=16,
                      buffer_size=10000,
                      mode='train',
                      unsure=1):

    # Load Byte-Level BPE Tokenizer with mimic-cxr vocabulary
    tokenizer = ByteLevelBPETokenizer(
        os.path.join(vocabulary_root_loc, 'mimic-vocab.json'),
        os.path.join(vocabulary_root_loc, 'mimic-merges.txt'),
    )

    # Read train.csv file and set unsure values (-1) to 0 or 1
    csv_file = os.path.join(dataset_csv_root_loc, f'{mode}.csv')
    replaced_values = {float('nan'): 0, -1.0: unsure}
    reports = pd.read_csv(csv_file).replace(replaced_values).values

    # Get image paths, reports and labels
    cxr_image_paths = [os.path.join(mimic_cxr_root_loc, path) for path in reports[:, 0]]
    texts = reports[:, 1]
    classes = np.uint8(reports[:, 2:])

    # Tokenize reports
    tokenize_report_texts = tokenizer.encode_batch(list(texts))

    # Add [START] and [END] tokens
    tokenize_report_texts = [[tokenizer.token_to_id('<s>')] + seq.ids + [tokenizer.token_to_id('</s>')] for seq in
                             tokenize_report_texts]

    # Pad the tokenized reports
    tokenize_report_texts = tf.keras.preprocessing.sequence.pad_sequences(
        tokenize_report_texts,
        maxlen=seq_max_length,
        dtype='int32',
        padding='post',
        truncating='post')

    tokenize_report_texts = tokenize_report_texts[:, :(seq_max_length + 1)]

    # Drop the [END] tokens
    texts_inputs = tokenize_report_texts[:, :-1]

    # Drop the [START] tokens
    texts_labels = tokenize_report_texts[:, 1:]

    # Create dataset (cxr_image, cxr_report) pair
    dataset = tf.data.Dataset.from_tensor_slices((cxr_image_paths, texts_inputs, texts_labels))

    # Shuffle dataset of train mode
    if mode == 'train':
        dataset = dataset.shuffle(buffer_size)

    # Parse dataset
    dataset = dataset.map(parse_function, num_parallel_calls=n_threads)

    # Augment dataset of train mode
    if mode == 'train':
        dataset = dataset.map(augmentation_fn, num_parallel_calls=n_threads)

    # Make dataset grayscale
    dataset = dataset.map(make_grayscale_fn, num_parallel_calls=n_threads)

    # Add labels to dataset
    dataset = dataset.batch(batch_size)

    return dataset, tokenizer
