import React, { useState } from 'react';
import axios from 'axios';

function Weather({ apiUrl }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(`${apiUrl}/weather?city=${encodeURIComponent(city)}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-section">
      <h2>🌤️ Weather Information</h2>
      <p className="description">Get current weather for any city</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-card">
          <div className="weather-header">
            <h3>{weather.location.city}</h3>
            <p>{weather.location.region}, {weather.location.country}</p>
          </div>

          <div className="weather-current">
            <div className="weather-temp">
              <span className="temp-large">{weather.current.temperature}</span>
              <span className="temp-small">Feels like {weather.current.feelsLike}</span>
            </div>
            <div className="weather-desc">
              <img src={weather.current.icon} alt={weather.current.description} />
              <p>{weather.current.description}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="weather-detail-item">
              <span className="detail-label">💧 Humidity</span>
              <span className="detail-value">{weather.current.humidity}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">💨 Wind Speed</span>
              <span className="detail-value">{weather.current.windSpeed}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">🧭 Wind Direction</span>
              <span className="detail-value">{weather.current.windDirection}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">🔆 UV Index</span>
              <span className="detail-value">{weather.current.uvIndex}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">👁️ Visibility</span>
              <span className="detail-value">{weather.current.visibility}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">🌡️ Pressure</span>
              <span className="detail-value">{weather.current.pressure}</span>
            </div>
          </div>

          <div className="weather-forecast">
            <h4>Today's Forecast</h4>
            <div className="forecast-details">
              <div className="forecast-item">
                <span>🌡️ Max Temp</span>
                <strong>{weather.forecast.maxTemp}</strong>
              </div>
              <div className="forecast-item">
                <span>🌡️ Min Temp</span>
                <strong>{weather.forecast.minTemp}</strong>
              </div>
              <div className="forecast-item">
                <span>🌅 Sunrise</span>
                <strong>{weather.forecast.sunrise}</strong>
              </div>
              <div className="forecast-item">
                <span>🌇 Sunset</span>
                <strong>{weather.forecast.sunset}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
