import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM,Dense

print('Loading preprocessed Data:....')
X_train=np.load('X_train.npy')
X_test=np.load('X_test.npy')
y_train=np.load('y_train.npy')
y_test=np.load('y_test.npy')

print(f"X_train shape: {X_train.shape}")
print(f"y_train shape: {y_train.shape}")
print(f"X_test shape: {X_test.shape}")
print(f"y_test shape: {y_test.shape}")

#Building LSTM Model
print("\n Building the LSTM model...")
model=Sequential()

model.add(LSTM(50,input_shape=(60,1),activation='tanh'))

#otpt
model.add(Dense(10))

model.compile(optimizer="adam",loss='mse')

model.summary()

print('\n training the model')
history=model.fit(
  X_train,y_train,
  epochs=20,
  batch_size=32,
  validation_data=(X_test,y_test),
  verbose=1
)

model.save('stock_model.h5')
print("\n model saved as stock_model.h5")

