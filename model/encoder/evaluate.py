import tqdm
import numpy as np
import tensorflow as tf
from dataset.get_image_dataset import get_test_dataset
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

test_dataset = get_test_dataset()
model = tf.keras.models.load_model('weights-improvement-09-0.32.hdf5')

y_true_all = []
y_pred_all = []

for i, (x, y_true) in tqdm.tqdm(enumerate(test_dataset), total=len(test_dataset)):
    y_pred = model.predict(x)
    y_true_all.append(y_true[0])
    y_pred_all.append(y_pred[0])
y_true_all = np.array(y_true_all)
y_pred_all = np.array(y_pred_all)

label_baseline_probs = []

# calculate metrics for each class
# auc, accuracy, precision, recall, f_score

for i in range(14):
    # calculate fpr=false positive rate, tpr=true positive rate, thresholds
    fpr, tpr, thresholds = roc_curve(y_true_all[:, i], y_pred_all[:, i])

    # calculate AUC
    auc_score = auc(fpr, tpr)

    # calculate optimal threshold
    optimal_idx = np.argmax(tpr - fpr)
    optimal_threshold = thresholds[optimal_idx]

    # calculate accuracy
    acc_score = accuracy_score(y_true_all[:, i], y_pred_all[:, i] > optimal_threshold)

    # calculate precision, recall, f_score
    precision, recall, f1_score, _ = precision_recall_fscore_support(y_true_all[:, i],
                                                                    y_pred_all[:, i] > optimal_threshold,
                                                                     average='binary')

    print(f'{abnormalities[i]:<20} {auc_score:>.5f}, \t {acc_score:>.5f}, \t {precision:>.5f}, \t {recall:>.5f}, \t {f1_score:>.5f}')

    pyplot.title(abnormalities[i])
    pyplot.plot(fpr, tpr, marker='.', label=f'{abnormalities[i]}')
    pyplot.xlabel('False Positive Rate')
    pyplot.ylabel('True Positive Rate')
    pyplot.savefig(f'roc_curves/roc_curve_{i}.png')
    pyplot.clf()

