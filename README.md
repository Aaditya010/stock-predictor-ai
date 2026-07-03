# Stock Predictor AI

A deep learning project that predicts future stock prices using LSTM neural networks.

## Project Structure

- backend/ – Python code for data fetching, preprocessing, and model training

## How It Works

1. Download historical stock data (Apple stock used as an example).
2. Preprocess the data: scale prices and create sliding windows (60 days to predict the next 10 days).
3. Train an LSTM neural network on the patterns.
4. Save the trained model to make future predictions.

## How to Run

1. Create a virtual environment:
   python -m venv venv
   source venv/bin/activate

2. Install dependencies:
   pip install -r requirements.txt

3. Preprocess the data:
   python preprocess.py

4. Train the LSTM model:
   python train_model.py

## Files Generated

- `scaler.pkl` – Saves the normalization parameters.
- `stock_model.h5` – The trained LSTM model.
- `X_train.npy`, `y_train.npy`, etc. – Preprocessed data arrays.

## Tech Stack

- Python, Pandas, NumPy
- Scikit-Learn (MinMaxScaler)
- TensorFlow / Keras (LSTM)
- FastAPI (for serving predictions)
- React (for the dashboard)