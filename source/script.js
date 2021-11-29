let now = new Date();

let months =[
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let day = days[now.getDay()];
let hour = ("0" + now.getHours()).slice(-2);
let minute = ('0'+now.getMinutes()).slice(-2);

let currentDate = document.querySelector("#current-date")
currentDate.innerHTML = `${month} ${date}, ${year}`

let currentTime = document.querySelector("#current-time")
currentTime.innerHTML = `${day} ${hour}:${minute}`


//change of city
function showTemperature (response) {
  let temperature = Math.round(response.data.main.temp);
let city = (response.data.name);
  let forecast = (response.data.weather[0].description);
  let humidity = (response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
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


