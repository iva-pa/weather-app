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

//weather forecast
function showTemperature (response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let forecastElement = document.querySelector("#forecast-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let cityElement = document.querySelector("#selected-city");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = (response.data.name);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  forecastElement.innerHTML = (response.data.weather[0].description);
  humidityElement.innerHTML = `Humidity: ${(response.data.main.humidity)}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchDefault(city) {
let apiKey = "bd2d78faf9d1acb5b346a3bce88defb1";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
axios.get(apiUrl).then(showTemperature)
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
searchDefault(city);

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


searchDefault("Amsterdam");