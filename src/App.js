import { useState } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found! Please check the name.");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <div className="loader"></div>}
      {error && <p className="msg error">⚠️ {error}</p>}

      {weather && (
        <div className="card">
          <h2>📍 {weather.name}, {weather.sys.country}</h2>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>

          <div className="details">
            <div className="detail-item">
              <span>💧</span>
              Humidity<br />{weather.main.humidity}%
            </div>
            <div className="detail-item">
              <span>💨</span>
              Wind<br />{weather.wind.speed} m/s
            </div>
            <div className="detail-item">
              <span>🌡</span>
              Feels Like<br />{Math.round(weather.main.feels_like)}°C
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
