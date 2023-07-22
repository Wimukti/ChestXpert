import tensorflow as tf
from dataset.get_image_dataset import get_train_dataset, get_validate_dataset
from model.decoder.transformer import Transformer, default_hparams


validate_dataset = get_validate_dataset()
train_dataset = get_train_dataset()

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    filepath='decoder_checkpoints/weights-improvement-{epoch:02d}-{val_accuracy:.2f}.hdf5',
    monitor='val_loss', verbose=1)

hparams = default_hparams()

# Assuming you have `train_dataset` and `validate_dataset` already defined from previous code
transformer = Transformer(
    num_layers=hparams['num_layers'],
    d_model=hparams['d_model'],
    num_heads=hparams['num_heads'],
    dff=hparams['dff'],
    target_vocab_size=2048,
    dropout_rate=hparams['dropout_rate'],
    input_shape=(hparams['img_x'], hparams['img_y'], hparams['img_ch']),
    vit_pretrained_model=hparams['vit_pretrained_model'],
    cnn_pretrained_weights=hparams['cnn_pretrained_weights']
)

# You may need to adjust the loss and metrics based on your specific task
transformer.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

class TransformerCheckpoint(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(f'Saving transformer weights epoch: {epoch} to decoder_checkpoints/epoch_{epoch}.hdf5')
        self.model.save_weights(f'decoder_checkpoints/epoch_{epoch}.hdf5')

transformer.fit(train_dataset,
                validation_data=validate_dataset,
                epochs=10,
                callbacks=[checkpoint, TransformerCheckpoint()])
