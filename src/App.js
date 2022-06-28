import React, { useState } from "react";
import axios from "axios";

function App() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");
	const [temperature, setTemperature] = useState(0);
	const [unit, setUnit] = useState("Celsius");

	const toggleDisplay = () => {
		if (unit === "Celsius") {
			setUnit("Fahrenheit");
		} else {
			setUnit("Celsius");
		}
	};

	const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=fc9b0a17a4e689fdce97b5adaef2f85f`;

	const searchLocation = (event) => {
		if (event.key === "Enter") {
			axios.get(weather_url).then((response) => {
				setData(response.data);
				setTemperature(response.data.main.temp);
				console.log(response.data);
			});
			setLocation("");
		}
	};

	const convertTemperatureMetric = () => {
		if (unit === "Celsius") {
			return `${temperature.toFixed()}°F`;
		}
		const converted = (((temperature - 32) * 5) / 9).toFixed();
		return `${converted}°C`;
	};

	const convertFeelsLikeMetric = () => {
		if (unit === "Celsius") {
			return `${data.main.feels_like.toFixed()}°F`;
		}
		const converted = (((data.main.feels_like - 32) * 5) / 9).toFixed();
		return `${converted}°C`;
	};

	return (
		<div className="app">
			<div className="header">
      <div className="search">
				<input
					value={location}
					onChange={(event) => setLocation(event.target.value)}
					onKeyPress={searchLocation}
					placeholder="Enter Location"
					type="text"
				/>
			</div>
			<div className="changeTemp">
				<button onClick={toggleDisplay}>{unit}</button>
			</div>
      </div>
			<div className="container">
				<div className="top">
					<div className="location">
						<p>{data.name}</p>
					</div>
					<div className="temp">{data.main ? <h1>{convertTemperatureMetric()}</h1> : null}</div>
					<div className="description">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
				</div>

				{data.name !== undefined && (
					<div className="bottom">
						<div className="feels">
							{data.main ? <p className="bold">{convertFeelsLikeMetric()}</p> : null}
							<p>Feels Like</p>
						</div>
						<div className="humidity">
							{data.main ? <p className="bold">{data.main.humidity}%</p> : null}
							<p>Humidity</p>
						</div>
						<div className="wind">
							{data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
							<p>Wind Speed</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
