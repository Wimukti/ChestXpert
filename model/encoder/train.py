import tensorflow as tf
from dataset.get_image_dataset import get_train_dataset, get_validate_dataset

# ToDo: Add test dataset
validate_dataset = get_validate_dataset()
train_dataset = get_train_dataset()

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    filepath='checkpoint/weights-improvement-{epoch:02d}-{val_accuracy:.2f}.hdf5',
    monitor='val_loss', verbose=1)

model = tf.keras.Sequential([
 tf.keras.layers.Densenet121(),
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(1024, activation='relu'),
    tf.keras.layers.Dense(14, activation='sigmoid')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)


class ResNetCheckpoint(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(f'Saving model weights epoch: {epoch} to checkpoint/epoch_{epoch}.hdf5')
        self.model.layers[0].save_weights(f'checkpoint/epoch_{epoch}.hdf5')


model.fit(train_dataset,
          validation_data=validate_dataset,
          epochs=10,
          callbacks=[checkpoint, ResNetCheckpoint()])
