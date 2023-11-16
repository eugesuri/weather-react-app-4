import React, { useState } from "react";
import App from "./App";
import axios from "axios";

import "./Weather.css";

export default function SearchEngine(props) {
  let [city, setCity] = useState("");
  let [submitted, setSubmitted] = useState(false);
  let [temperature, setTemperature] = useState(null);
  let [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57821c3b75b60c68ecd1a8d0dd1aa8d3&units=metric`;

    axios.get(url).then((response) => {
      setTemperature(response.data.main.temp);
      setSubmitted(true);
      setLoading(false);
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <h1 className="Search-engine">Search Engine</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      {loading && <p>Loading...</p>}
      {submitted && city && (
        <h2>
          It's {Math.round(temperature)}°C in {city}
        </h2>
      )}
    </div>
  );
}
