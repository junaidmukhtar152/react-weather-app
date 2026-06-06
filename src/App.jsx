import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function getWeather() {
    console.log("Button clicked");
    setLoading(true);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d45b92fefa577e56cfdbb2fa6ea3de66&units=metric`,
    );
    const data = await response.json();
    setLoading(false);
    if (data.cod === "404") {
      setError("City not found");
      setWeather(null);
      return;
    }
    console.log(data.main.temp);
    setError("");
    setWeather(data);
  }
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Search</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <h2 className="temperature">{Math.round(weather.main.temp)}°C</h2>
      )}
      {weather && <h2 className="city">{weather.name}</h2>}
      {weather && <h3 className="condition">{weather.weather[0].main}</h3>}
      {weather && (
        <p className="description">{weather.weather[0].description}</p>
      )}
      {weather && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      )}
    </div>
  );
}

export default App;
