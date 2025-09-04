const apiKey = '8d27d3dcd01dda287df424d7f9c03fd1';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetchWeather(url);
        }, (error) => {
            console.error('Geolocation error:', error);
            alert('Failed to get your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}

// The displayWeather function remains unchanged
function displayWeather(data) {
    const { main: { temp, feels_like, temp_min, temp_max, humidity, pressure }, weather, wind: { speed, deg, gust }, clouds: { all: cloudiness }, sys: { country, sunrise, sunset }, name, visibility, timezone } = data;
    const [{ main: weatherMain, description, icon }] = weather;
    
    const leafSection = document.getElementById('leaf');
    if (weatherMain.toLowerCase().includes('rain')) {
        leafSection.className = 'rainy';
    } else if (weatherMain.toLowerCase().includes('clear')) {
        leafSection.className = 'sunny';
    } else {
        leafSection.className = 'cloudy';
    }

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    const weatherHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h2>Weather in ${name}, ${country}</h2>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p><img src="temperature.png" alt="Temp Icon" style="width:20px;height:20px;"> Temperature: ${temp} °C</p>
            <p><img src="like.png" alt="Feels Like Icon" style="width:20px;height:20px;"> Feels Like: ${feels_like} °C</p>
            <p><img src="hot.png" alt="Min Temp Icon" style="width:20px;height:20px;"> Min Temperature: ${temp_min} °C</p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p><img src="hot.png" alt="Max Temp Icon" style="width:20px;height:20px;"> Max Temperature: ${temp_max} °C</p>
            <p><img src="weather.png" alt="Weather Icon" style="width:20px;height:20px;"> Weather: ${weatherMain} (${description})</p>
            <p><img src="humidity.png" alt="Humidity Icon" style="width:20px;height:20px;"> Humidity: ${humidity}%</p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p><img src="weather.png" alt="Pressure Icon" style="width:20px;height:20px;"> Pressure: ${pressure} hPa</p>
            <p><img src="low-visibility.png" alt="Visibility Icon" style="width:20px;height:20px;"> Visibility: ${visibility / 1000} km</p>
            <p><img src="storm.png" alt="Wind Speed Icon" style="width:20px;height:20px;"> Wind Speed: ${speed} m/s</p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p><img src="sun.png" alt="Wind Direction Icon" style="width:20px;height:20px;"> Wind Direction: ${deg}°</p>
            <p><img src="weather.png" alt="Wind Gust Icon" style="width:20px;height:20px;"> Wind Gust: ${gust} m/s</p>
            <p><img src="cloud.png" alt="Cloudiness Icon" style="width:20px;height:20px;"> Cloudiness: ${cloudiness}%</p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px; margin-left: -300px;">
            <p><img src="sunrise.png" alt="Sunrise Icon" style="width:20px;height:20px;"> Sunrise: ${sunriseTime}</p>
            <p><img src="sun.png" alt="Sunset Icon" style="width:20px;height:20px;"> Sunset: ${sunsetTime}</p>
            <p><img src="hot.png" alt="Timezone Icon" style="width:20px;height:20px;"> Timezone: GMT ${timezone / 3600}</p>
        </div>
    </div>
    <div style="text-align: center; margin-top: 20px;">
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    </div>
    `;
    weatherDisplay.innerHTML = weatherHTML;
}


