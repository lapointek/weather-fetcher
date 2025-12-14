import { useState } from "react";
import "./App.css";

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState("");

    const searchPressed = async () => {
        try {
            const url = `${api.base}weather?q=${search}&units=metric&appid=${api.key}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            const iconCode = data.weather[0].icon;
            console.log(data);
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
            });
        } catch (error) {
            console.error("Could not fetch data", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div class="container">
                    <h1>Weather Forecast</h1>
                    <img src={weather.icon} onerror="this.src.display='none'" />
                    <div>
                        <input
                            class="inputField"
                            type="text"
                            placeholder="Enter city/town..."
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                        <button class="button" onClick={searchPressed}>
                            Search
                        </button>
                    </div>
                    <div class="descriptionContainer">
                        <p>Location: {weather.location}</p>
                        <p>Condition: {weather.description}</p>
                        <p>Temperature: {weather.temperature} °C</p>
                        <p>Humidity: {weather.humidity}%</p>
                        <p>Wind Speed: {weather.windSpeed} m/s</p>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
