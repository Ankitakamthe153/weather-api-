const y = document.getElementById("weather-info");
document.getElementById('fetch-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById('main-heading').classList.add('hidden');
    document.getElementById('fetch-button').classList.add('hidden');
    document.getElementById('weather-heading').classList.remove('hidden');
    document.getElementById('map').classList.remove('hidden');
    document.getElementById('weather-info').classList.remove('hidden');
    document.getElementById('weather-sub').classList.remove('hidden');
    document.getElementById('weather-info-head').classList.remove('hidden');

    const x = document.getElementById("demo");
    // Display latitude and longitude
    x.innerHTML = "Latitude: " + lat + "   Longitude: " + lon;
    displayMap(lat, lon);
    fetchWeatherData(lat, lon);
}

function displayMap(lat, lon) {
    const mapIframe = document.createElement('iframe');
    mapIframe.width = '100%';
    mapIframe.height = '400';

    // Google Maps URL with latitude and longitude
    const googleMapsUrl = `https://maps.google.com/maps?q= ${lat},${lon}&z=15&output=embed`;
    mapIframe.src = googleMapsUrl;

    document.getElementById('map').appendChild(mapIframe);
}

function fetchWeatherData(lat, lon) {
    // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
   const url = `https://api.weatherapi.com/v1/current.json?key=97cf8ca66a704931b99120253240308&q=${lat},${lon}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const time = data.location.localtime;
    const formattime = time.slice(-5);
    const location = `Location: ${data.location.name}`;
    const windSpeed = `Wind Speed: ${data.current.wind_kph} kmph`;
    const humidity = `Humidity: ${data.current.humidity}`;
    const timezone = `Time Zone: GMT +${formattime}`;
    const pressure = `Pressure: ${data.current.pressure_in} atm`;
    const windDirection = `Wind Direction: ${data.current.wind_dir}`;
    const uvIndex = `UV Index: ${data.current.uv}`;
    const feelsLike = `Feels Like: ${data.current.feelslike_c}°C`;

    y.innerHTML = `
        <div class="weather-block">${location}</div> 
        <div class="weather-block">${windSpeed}</div>
        <div class="weather-block">${humidity}</div>
        <div class="weather-block">${timezone}</div>
        <div class="weather-block">${pressure}</div>
        <div class="weather-block">${windDirection}</div>
        <div class="weather-block">${uvIndex}</div>
        <div class="weather-block">${feelsLike}</div>
    `;


    // Scroll to the weather info section
    y.scrollIntoView({ behavior: 'smooth' });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
