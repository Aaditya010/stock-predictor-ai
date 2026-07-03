import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib

#loading data
df=pd.read_csv('AAPL_data.csv',index_col='Date',parse_dates=True)

data=df[['Close']].values

scaler=MinMaxScaler()
scaled_data=scaler.fit_transform(data)

#train and predicting
def create_sequences(data,lookback=60,future=10):
  X,y=[],[]
  for i in range(lookback,len(data)-future):
    X.append(data[i-lookback:i,0])
    y.append(data[i:i+future,0])
  return np.array(X),np.array(y)

X,y=create_sequences(scaled_data)

#splitting train and test
split=int(len(X)*0.8)
X_train,X_test=X[:split],X[split:]
y_train,y_test=y[:split],y[split:]

#reshaping for LSTM
X_train=X_train.reshape((X_train.shape[0],X_train.shape[1],1))
X_test=X_test.reshape((X_test.shape[0],X_test.shape[1],1))

print(f"X_train shape: {X_train.shape}")
print(f"y_train shape: {y_train.shape}")
print(f"X_test shape: {X_test.shape}")
print(f"y_test shape: {y_test.shape}")

np.save('X_train.npy', X_train)
np.save('X_test.npy', X_test)
np.save('y_train.npy', y_train)
np.save('y_test.npy', y_test)
print("Training arrays saved as .npy files")

joblib.dump(scaler,'scaler.pkl')
print("Scaler saved as scaler.pkl")



