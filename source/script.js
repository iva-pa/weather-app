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

//change of city
function showTemperature (response) {
  let temperature = Math.round(response.data.main.temp);
let city = (response.data.name);
  let forecast = (response.data.weather[0].description);
  let humidity = (response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let cityElement = document.querySelector("#selected-city");
  cityElement.innerHTML = city;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature} °C`;
  let forecastElement = document.querySelector("#forecast-description");
  forecastElement.innerHTML = forecast;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} m/s`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
currentTime.innerHTML = formatTime(response.data.dt * 1000);
  console.log(response);
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

searchDefault("Amsterdam");


