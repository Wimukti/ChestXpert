import argparse
import json
import tensorflow as tf
from model.decoder.transformer import Transformer
from dataset.get_image_text_dataset import get_dataset

class CustomSchedule(tf.keras.optimizers.schedules.LearningRateSchedule):
    def __init__(self, d_model, warmup_steps=4000):
        super().__init__()

        self.d_model = d_model
        self.d_model = tf.cast(self.d_model, tf.float32)

        self.warmup_steps = warmup_steps

    def __call__(self, step):
        step = tf.cast(step, dtype=tf.float32)
        arg1 = tf.math.rsqrt(step)
        arg2 = step * (self.warmup_steps ** -1.5)

        return tf.math.rsqrt(self.d_model) * tf.math.minimum(arg1, arg2)

    def get_config(self):
        return {
            'd_model': str(int(self.d_model)),
            'warmup_steps': str(int(self.warmup_steps)),
        }


def masked_loss(label, pred):
    mask = label != 0
    loss_object = tf.keras.losses.SparseCategoricalCrossentropy(
        from_logits=True, reduction='none')
    loss = loss_object(label, pred)

    mask = tf.cast(mask, dtype=loss.dtype)
    loss *= mask

    loss = tf.reduce_sum(loss) / tf.reduce_sum(mask)
    return loss


def masked_accuracy(label, pred):
    pred = tf.argmax(pred, axis=2)
    label = tf.cast(label, pred.dtype)
    match = label == pred

    mask = label != 0

    match = match & mask

    match = tf.cast(match, dtype=tf.float32)
    mask = tf.cast(mask, dtype=tf.float32)
    return tf.reduce_sum(match) / tf.reduce_sum(mask)


def main(args, hyper_parameters):

    train_batches, tokenizer = get_dataset(args.dataset_csv_root_loc, args.vocabulary_root_loc, args.mimic_cxr_root_loc,
                                                 batch_size=args.batch_size)

    validate_batches, _ = get_dataset(args.dataset_csv_root_loc, args.vocabulary_root_loc, args.mimic_cxr_root_loc,
                                       mode='validate',
                                       batch_size=args.batch_size)

    # Create a callback that saves the model's logs
    csv_logger_callback = tf.keras.callbacks.CSVLogger('checkpoints/training.log')

    # Create a callback that saves the model's weights
    model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
        filepath=f'checkpoints/final.tf',
        save_weights_only=True,
        monitor='val_masked_accuracy',
        mode='max',
        save_best_only=True)

    learning_rate = args.init_lr if args.init_lr is not None else CustomSchedule(hyper_parameters['d_model'])

    optimizer = tf.keras.optimizers.Adam(learning_rate, beta_1=0.9, beta_2=0.98, epsilon=1e-9)

    transformer = Transformer(
        num_layers=hyper_parameters['num_layers'],
        d_model=hyper_parameters['d_model'],
        num_heads=hyper_parameters['num_heads'],
        dff=hyper_parameters['dff'],
        target_vocab_size=tokenizer.get_vocab_size(),
        dropout_rate=hyper_parameters['dropout_rate'],
        input_shape=(224, 224, 1),
        encoder_weights=args.encoder_weights)

    transformer.compile(
        loss=masked_loss,
        optimizer=optimizer,
        metrics=[masked_accuracy],
    )

    transformer.fit(
        train_batches,
        epochs=args.n_epochs,
        validation_data=validate_batches,
        callbacks=[model_checkpoint_callback, csv_logger_callback]
    )


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--dataset_csv_root_loc', default='preprocessing/mimic')
    parser.add_argument('--vocabulary_root_loc', default='preprocessing/mimic')
    parser.add_argument('--mimic_cxr_root_loc', default='MIMIC-CXR/mimic-cxr-jpg')
    parser.add_argument('--encoder_weights', default=None)
    parser.add_argument('--n_epochs', default=10)
    parser.add_argument('--init_lr', default=None)
    parser.add_argument('--batch_size', default=32)
    args = parser.parse_args()

    # Load mode default hyperparameters and update from file if exist
    with open('hyper_parameters.json') as params:
        hyper_parameters = json.load(params)
        hyper_parameters.update((k, hyper_parameters[k])
                                for k in set(hyper_parameters).intersection(hyper_parameters))

    # Run training
    main(args=args, hyper_parameters=hyper_parameters)
