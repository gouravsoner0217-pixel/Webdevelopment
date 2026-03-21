import { useState } from "react";
import "./App.css";

const API_KEY = "959cc95784c440d0a2f125814262103";

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
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
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
          <h2>📍 {weather.location.name}, {weather.location.country}</h2>
          <img
            className="weather-icon"
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
          />
          <p className="temp">{weather.current.temp_c}°C</p>
          <p className="desc">{weather.current.condition.text}</p>

          <div className="details">
            <div className="detail-item">
              <span>💧</span>
              Humidity<br />{weather.current.humidity}%
            </div>
            <div className="detail-item">
              <span>💨</span>
              Wind<br />{weather.current.wind_kph} km/h
            </div>
            <div className="detail-item">
              <span>🌡</span>
              Feels Like<br />{weather.current.feelslike_c}°C
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
