import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./Weatherinfo";
import WeatherForecast from "./WeatherForecast";

import "./Weather.css";
export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      city: response.data.name,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
    });
  }
  function search() {
    const apikey = "3c949ba49d38be2487ee278e0d2d4059";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric `;
    axios.get(apiurl).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCity(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className=" m-2 form-control"
                autoFocus="on"
                onChange={handleCity}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary m-2 w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinate={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "loading....";
  }
}
