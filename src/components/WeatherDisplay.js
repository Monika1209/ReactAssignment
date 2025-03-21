import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../store/WeatherSlice";

const defaultCities = ["Faridabad", "Delhi", "Punjab"];

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    defaultCities.forEach((city) => {
      if (!weather.cities[city]) {
        dispatch(fetchWeather(city));
      }
    });
  }, [dispatch, weather.cities]);

  return (
    <div className="row justify-content-center">
      {weather.loading && <p className="text-center">Loading...</p>}
      {weather.error && <p className="text-danger text-center">Error: {weather.error}</p>}
      {Object.keys(weather.cities).map((city) => (
        <div key={city} className="col-md-4 mb-4">
          <div className="weather-card">
            <h3>{weather.cities[city].name}</h3>
            <p>🌡️ <strong>Temperature:</strong> {weather.cities[city].main.temp}°C</p>
            <p>💧 <strong>Humidity:</strong> {weather.cities[city].main.humidity}%</p>
            <p>🌬️ <strong>Wind Speed:</strong> {weather.cities[city].wind.speed} m/s</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
