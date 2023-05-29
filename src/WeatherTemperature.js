import React, { useState } from "react";
export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celcius");
  function showFr(event) {
    event.preventDefault();
    setUnit("fahrenhit");
  }
  function showCel(event) {
    event.preventDefault();
    setUnit("celcius");
  }
  function fahrenhit() {
    return (props.celcius * 9) / 5 + 32;
  }
  if (unit === "celcius") {
    return (
      <div className="WeatherTemperature">
        <span className="temperature">{Math.round(props.celcius)}</span>
        <span className="unit">
          °C |{" "}
          <a href="/" onClick={showFr}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div className="WeatherTemperature">
        <span className="temperature">{Math.round(fahrenhit())}</span>
        <span className="unit">
          <a href="/" onClick={showCel}>
            °C
          </a>{" "}
          | °F
        </span>
      </div>
    );
  }
}
