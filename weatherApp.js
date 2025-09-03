// weatherApp.js

const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".city").innerHTML = "City Not Found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/h";
        weatherIcon.src = "./images/rain.png"; // default icon
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Change weather icon according to condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png";
        }
    }
}

// Search button click event
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Enter key event
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
