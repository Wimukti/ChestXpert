import tensorflow as tf
from dataset.get_image_dataset import get_train_dataset, get_validate_dataset
from encoder.encoder import create_encoder

validate_dataset = get_validate_dataset()
train_dataset = get_train_dataset()

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    filepath='encoder_checkpoints/weights-improvement-{epoch:02d}-{val_accuracy:.2f}.hdf5',
    monitor='val_loss', verbose=1)

encoder = create_encoder(input_shape=(224, 224, 1), vit_pretrained_model="google/vit-base-patch16-224-in21k")

# You may need to adjust the loss and metrics based on your specific task
encoder.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

class EncoderCheckpoint(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(f'Saving encoder weights epoch: {epoch} to encoder_checkpoints/epoch_{epoch}.hdf5')
        self.model.save_weights(f'encoder_checkpoints/epoch_{epoch}.hdf5')

# Assuming you have `train_dataset` and `validate_dataset` already defined from previous code
encoder.fit(train_dataset,
            validation_data=validate_dataset,
            epochs=10,
            callbacks=[checkpoint, EncoderCheckpoint()])
