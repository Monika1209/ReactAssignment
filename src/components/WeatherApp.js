import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchWeather } from "../store/WeatherSlice";
import WeatherDisplay from "./WeatherDisplay";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
      setCity("");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mb-4 text-center fw-bold mt-5">🌍 Live Weather Updates</h1>

      <div className="input-group mb-4 w-50 d-flex justify-content-center mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-custom" onClick={handleSearch}>Search</button>
      </div>

      <WeatherDisplay />
    </div>
  );
};

export default WeatherApp;
