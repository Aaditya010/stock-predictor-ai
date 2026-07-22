# Stock Predictor AI

A full-stack deep learning application that forecasts stock prices using LSTM neural networks. Users enter a ticker symbol, and the app predicts the next 10 days of closing prices, visualized instantly on a live chart.

## Live Demo

- Frontend (React App): [https://stock-predictor-ai-1.onrender.com](https://stock-predictor-ai-1.onrender.com)
- Backend API (Swagger Docs): [https://stock-predictor-ai-27re.onrender.com/docs](https://stock-predictor-ai-27re.onrender.com/docs)



## How It Works

1. Data Fetching – Downloads historical stock data from Yahoo Finance.
2. Preprocessing – Scales prices to 0–1 and creates sliding windows (60 days → predict next 10 days).
3. Training – Trains an LSTM neural network on the sequences and saves the model (`stock_model.h5`).
4. Prediction API – Serves the model via a FastAPI endpoint (`/predict`).
5. Frontend – React dashboard with a search bar and line chart (Recharts) to display predictions.

## Tech Stack

### Backend
- FastAPI – API framework
- TensorFlow / Keras – LSTM neural network
- Pandas / NumPy – Data processing
- Scikit-Learn – MinMaxScaler for normalization
- Uvicorn – ASGI server

### Frontend
- React (Vite) – UI framework
- Tailwind CSS – Styling
- Recharts – Line chart visualization
- Axios – API calls

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Aaditya010/stock-predictor-ai.git
cd stock-predictor-ai