const apiKey = '8d27d3dcd01dda287df424d7f9c03fd1';  

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(currentWeatherUrl, 'current');
    fetchWeather(forecastUrl, 'forecast');
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(currentWeatherUrl, 'current');
            fetchWeather(forecastUrl, 'forecast');
        }, error => {
            alert('Failed to get your location. Please ensure location services are enabled.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function fetchWeather(url, type) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather data could not be retrieved. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (type === 'current') {
                displayCurrentWeather(data);
            } else {
                displayForecast(data);
            }
        })
        .catch(error => {
            alert(`Failed to fetch weather data. ${error.message}`);
        });
}

function displayCurrentWeather(data) {
    const {
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        weather,
        wind: { speed, deg, gust },
        clouds: { all: cloudiness },
        sys: { country, sunrise, sunset },
        name,
        visibility,
        timezone,
    } = data;

    const [{ main: weatherMain, description, icon }] = weather;
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    const currentWeatherDisplay = document.getElementById('currentWeatherDisplay');

    const weatherHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2>Weather in ${name}, ${country}</h2>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
             <!-- Row 1 -->
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The current temperature in degrees Celsius.">
                <img src="images1/temperature.png" alt="Temp Icon" style="width:20px;height:20px;"> Temperature: ${temp} °C
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="How the temperature feels to the human body.">
                <img src="images1/like.png" alt="Feels Like Icon" style="width:20px;height:20px;"> Feels Like: ${feels_like} °C
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The lowest temperature recorded today.">
                <img src="images1/hot.png" alt="Min Temp Icon" style="width:20px;height:20px;"> Min Temperature: ${temp_min} °C
            </p>
        </div>
        <!-- Row 2 -->
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The highest temperature recorded today.">
                <img src="images1/hot.png" alt="Max Temp Icon" style="width:20px;height:20px;"> Max Temperature: ${temp_max} °C
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The current weather condition and its description.">
                <img src="images1/weather.png" alt="Weather Icon" style="width:20px;height:20px;"> Weather: ${weatherMain} (${description})
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The current humidity percentage in the air.">
                <img src="images1/humidity.png" alt="Humidity Icon" style="width:20px;height:20px;"> Humidity: ${humidity}%
            </p>
        </div>
        <!-- Row 3 -->
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The atmospheric pressure at sea level in hPa.">
                <img src="images1/weather.png" alt="Pressure Icon" style="width:20px;height:20px;"> Pressure: ${pressure} hPa
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="How far you can see, in kilometers.">
                <img src="images1/low-visibility.png" alt="Visibility Icon" style="width:20px;height:20px;"> Visibility: ${(visibility / 1000).toFixed(2)} km
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The speed of the wind in meters per second.">
                <img src="images1/storm.png" alt="Wind Speed Icon" style="width:20px;height:20px;"> Wind Speed: ${speed} m/s
            </p>
        </div>
        <!-- Row 4 -->
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The direction from which the wind is coming, in degrees.">
                <img src="images1/sun.png" alt="Wind Direction Icon" style="width:20px;height:20px;"> Wind Direction: ${deg}°
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The maximum wind gust speed in meters per second.">
                <img src="images1/weather.png" alt="Wind Gust Icon" style="width:20px;height:20px;"> Wind Gust: ${gust} m/s
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The percentage of the sky covered by clouds.">
                <img src="images1/cloud.png" alt="Cloudiness Icon" style="width:20px;height:20px;"> Cloudiness: ${cloudiness}%
            </p>
        </div>
        <!-- Row 5 -->
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The time of sunrise in local time.">
                <img src="images1/sunrise.png" alt="Sunrise Icon" style="width:20px;height:20px;"> Sunrise: ${sunriseTime}
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The time of sunset in local time.">
                <img src="images1/sun.png" alt="Sunset Icon" style="width:20px;height:20px;"> Sunset: ${sunsetTime}
            </p>
        </div>
        <div style="flex: 1 1 30%; min-width: 250px;">
            <p title="The time zone offset from GMT, in hours.">
                <img src="images1/hot.png" alt="Timezone Icon" style="width:20px;height:20px;"> Timezone: GMT ${timezone / 3600}
            </p>
        </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon" style="width:100px;height:100px;">
    </div>
    `;

    currentWeatherDisplay.innerHTML = weatherHTML;
}

function displayForecast(data) {
    const list = data.list;
    let content = `<h2>5-Day Forecast for ${data.city.name}</h2><div id="forecast">`;

    for (let i = 0; i < list.length; i += 8) {  
        const forecast = list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const tempMax = Math.round(forecast.main.temp_max);
        const tempMin = Math.round(forecast.main.temp_min);
        const weatherDescription = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;

        content += `
            <div>
                <p>${date}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p>Max: ${tempMax}°C / Min: ${tempMin}°C</p>
                <p>${weatherDescription}</p>
            </div>
        `;
    }

    content += '</div>';
    document.getElementById('forecastWeatherDisplay').innerHTML = content;
}

