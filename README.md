# Stock Predictor AI

A deep learning project that predicts future stock prices using LSTM neural networks.

## Project Structure

- backend/ – Python code for data fetching, preprocessing, and model training
- frontend/ – React dashboard (coming soon)

## Data Source

Apple stock data (AAPL) from 1980 to 2014, downloaded from a public CSV source.

## How to run

1. Create a virtual environment:
   python -m venv venv
   source venv/bin/activate

2. Install dependencies:
   pip install -r requirements.txt

3. Run the preprocessing script:
   python preprocess.py

## Tech Stack

- Python, Pandas, NumPy
- Scikit-Learn (MinMaxScaler)
- TensorFlow / Keras (LSTM)
- FastAPI (for serving predictions)
- React (for the dashboard)
