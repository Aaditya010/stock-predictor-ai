import joblib
import numpy as np
import pandas as pd
import yfinance as yf
from tensorflow.keras.models import load_model
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
import uvicorn

model=load_model('stock_model.h5',compile=False)
scaler=joblib.load('scaler.pkl')

app=FastAPI(title="stock Predictor AI")

class TickerRequest(BaseModel):
  ticker:str

def fetch_and_preprocess(ticker: str):

  df=yf.download(ticker,period='100d',interval='1d',progress=False)

  if df.empty:
    raise HTTPException(status_code=404,detail="Ticker not found or no data available")
  data=df[['Close']].values

  scaled_data=scaler.transform(data)

  lookback=60
  if len(scaled_data)<lookback:
    raise HTTPException(status_code=400,detail=f"Not enough data need at least {lookback} days")
  
  last_60=scaled_data[-lookback:].reshape(1,lookback,1)
  return last_60

@app.post("/predict")
def predict_stock(request:TickerRequest):
  X_input=fetch_and_preprocess(request.ticker)

  predict_scaled=model.predict(X_input)

  predict_prices=scaler.inverse_transform(predict_scaled)

  return{
    "ticker":request.ticker,
    "predicted_prices":predict_prices.flatten().tolist()
  }

@app.get("/")
def root():
  return{"message":"stock Predictor AI is running"}

if __name__=="__main__":
  uvicorn.run(app,host="0.0.0.0",port=8000)
