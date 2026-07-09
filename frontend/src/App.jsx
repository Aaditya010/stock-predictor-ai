import axios from 'axios';
import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [ticker, setTicker] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const popularTickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];

  const handlePredict = async () => {
  if (!ticker) return;
  setLoading(true);
  setError(null);
  setPrediction(null);

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await axios.post(`${API_URL}/predict`, { ticker });
    setPrediction(response.data.predicted_prices);
  } catch (err) {
    setError('Failed to fetch prediction. Is the backend running?');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleTickerClick = (tickerSymbol) => {
    setTicker(tickerSymbol);
    setTimeout(() => {
      handlePredict();
    }, 50);
  };

  const chartData = prediction?.map((price, index) => ({
    day: index + 1,
    price: Number(price.toFixed(2))
  }));

  return (
    <div
  className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/stock.jpg')" }}
>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Stock Predictor AI
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Predict the next 10 days using LSTM
        </p>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Try these popular stocks:</p>
          <div className="flex flex-wrap gap-2">
            {popularTickers.map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleTickerClick(symbol)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition ${
                  ticker === symbol
                    ? 'bg-blue-600 text-white border-blue-600' // Active state
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter Stock Ticker (e.g., AAPL)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            onClick={handlePredict}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {prediction && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Predicted Prices for {ticker}
            </h2>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={['auto', 'auto']} label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;