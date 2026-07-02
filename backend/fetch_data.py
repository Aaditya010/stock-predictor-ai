import yfinance as yf
import pandas as pd

ticker="AAPL"
start="2020-01-01"
end="2025-01-01"

print(f"Download data for {ticker}........")
df=yf.download(ticker,start=start,end=end)

df.to_csv(f"{ticker}_data.csv")
print(f"saved {len(df)} rows to {ticker}_data.csv")
print(f"Columns: {df.columns.tolist()}")