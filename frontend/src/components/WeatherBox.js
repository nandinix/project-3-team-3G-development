import React, { useEffect, useState } from "react";

const WeatherBox = () => {
    const [weather, setWeather] = useState(null);
    const apiKey = "d5b00e9c37bac3af5a17d05b97a71bf1";
    const location = "College Station, United States"; 

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.error("Error fetching weather data:", error));
    }, []);

    if (!weather) return <div>Loading weather...</div>;

    return (
        <div className="weather-box">
            <h3>Weather in {weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p>Current Temperature: {weather.main.temp}° F</p>
        </div>
    );
};

export default WeatherBox;