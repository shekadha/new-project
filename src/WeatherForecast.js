import React, { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";

import "./WeatherForecast.css";
import Axios from "axios";
export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  useEffect(() => {
    setLoaded(false);
  }, [props.coordinate]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }
  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (daily, index) {
            if (index < 5) {
              return (
                <div className="col " key={index}>
                  <div className="forecast1">
                    <WeatherForecastDay data={daily} />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    let apikey = "3c949ba49d38be2487ee278e0d2d4059";
    let lat = props.coordinate.lat;
    let lon = props.coordinate.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apikey}&units=metric`;
    Axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
