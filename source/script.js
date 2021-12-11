function formatDate(timestamp) {
let updateDate = new Date(timestamp); 
let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let month = months[updateDate.getMonth()];
let date = updateDate.getDate();
let year = updateDate.getFullYear();
return `${month} ${date}, ${year}`
}

function formatTime(timestamp) {
let updateDate = new Date(timestamp); 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let day = days[updateDate.getDay()];
let hour = ("0" + updateDate.getHours()).slice(-2);
let minute = ('0'+ updateDate.getMinutes()).slice(-2);
return `${day} ${hour}:${minute}`
}

// display daily forecast
function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
return days[day];
}

// display hourly forecast
function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = ("0" + time.getHours()).slice(-2);
  return(forecastHour);
}
function formatMinutes(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastMinute = ("0" + time.getMinutes()).slice(-2);
  return(forecastMinute);
}

function displayHourlyForecast (response) {
  console.log(response.data);
let forecast = response.data.hourly;

let forecastElement = document.querySelector("#weather-hourly-forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach (function (forecastHour, index) {
  if(index<6){
forecastHTML = forecastHTML + `
<div class="col-2 detail-forecast">
    <h5 id="forecast-hour">${formatHour(forecastHour.dt)}:${formatMinutes(forecastHour.dt)}</h5>
    <img src="images/${forecastHour.weather[0].icon}.png" alt="" width="46"/>
    <div class = "forecast-temperature">
    <span class="temperature-max">${Math.round(forecastHour.temp)}°C</span> 
    </div>
  </div>
`;
};
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
};

function displayDailyForecast (response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#weather-daily-forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach (function (forecastDay, index) {
  if(index<6){
forecastHTML = forecastHTML + `
<div class="col-12 detail-forecast">
<div class="row">
<div class="col-4">
    <h4 id="forecast-date">${formatDay(forecastDay.dt)}</h4></div>
    <div class = "col-4">
    <img src="images/${forecastDay.weather[0].icon}.png" alt="" width="46"/>
    </div>
    <div class = "forecast-temperature col-4">
    <span class="temperature-max">${Math.round(forecastDay.temp.max)}°C</span> / <span class = "temperature-min">${Math.round(forecastDay.temp.min)}°C</span>
    </div>
    </div>
  </div>
`;
};
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
};


//weather forecast
function getForecast(coordinates) {
let apiKey = "bd2d78faf9d1acb5b346a3bce88defb1";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayHourlyForecast);
axios.get(apiUrl).then(displayDailyForecast);
}

function showTemperature (response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let forecastElement = document.querySelector("#forecast-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let cityElement = document.querySelector("#selected-city");
  let iconElement = document.querySelector("#main-icon");
let pictureElement = document.querySelector(".container");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = (response.data.name);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  forecastElement.innerHTML = (response.data.weather[0].description);
  humidityElement.innerHTML = `Humidity: ${(response.data.main.humidity)}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  if (response.data.weather[0].icon === "01d"){
pictureElement.style.backgroundImage = "url('source/sun.jpg')";
  } else if (response.data.weather[0].icon === "01n") {
    pictureElement.style.backgroundImage = "url('source/night.jpg')";
  } else if (response.data.weather[0].icon === "02d" || response.data.weather[0].icon === "02n" || response.data.weather[0].icon === "03d" || response.data.weather[0].icon === "03n" || response.data.weather[0].icon === "04d" || response.data.weather[0].icon === "04n"){
pictureElement.style.backgroundImage = "url('source/clouds.jpg')";
  } else if (response.data.weather[0].icon === "09d" || response.data.weather[0].icon === "09n" || response.data.weather[0].icon === "10d" || response.data.weather[0].icon === "10n"){
pictureElement.style.backgroundImage = "url('source/rain.jpg')";
  } else if (response.data.weather[0].icon === "13d" || response.data.weather[0].icon === "13n"){
pictureElement.style.backgroundImage = "url('source/snow.jpg')";
  } else if (response.data.weather[0].icon === "50d" || response.data.weather[0].icon === "50n"){
pictureElement.style.backgroundImage = "url('source/fog.jpg')";
  }

  getForecast(response.data.coord);
}

//search for a city
function searchDefault(city) {
let apiKey = "bd2d78faf9d1acb5b346a3bce88defb1";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemperature)
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
searchDefault(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//search for current position of user
function getPosition() {
navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
let latitude = (position.coords.latitude);
let longitude = (position.coords.longitude);
let apiKey = "bd2d78faf9d1acb5b346a3bce88defb1";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
axios.get(apiUrl).then(showTemperature);
document.getElementById("search-form").reset();
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getPosition);

searchDefault("Amsterdam");