
let now = new Date();
let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let h5 = document.querySelector("h5");
h5.innerHTML = `${day} ${month} ${date}<br /> ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherIcon = response.data.weather[0].icon;
  document.querySelector("h2").innerHTML = `${city}`;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
}

function search(city) {
  let apiKey = "afd2be167f88dd904bc213780db71233";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  search(city); 
}
function showCurrentTemperature(response) {
    let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data.weather.icon);
  let weatherIcon = response.data.weather[0].icon;
  document.querySelector("#temp").innerHTML = `${temperature}`;
  document.querySelector("h2").innerHTML = `${city}`;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
}
function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "afd2be167f88dd904bc213780db71233";
  let units = "metric";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(showCurrentTemperature);
  console.log(apiLatUrl);

}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);
// https://api.openweathermap.org/data/2.5/weather?lat=54&lon=-9&appid=afd2be167f88dd904bc213780db71233&units=metric

function celciusLink(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `17`;
}
function fahrenheitLink(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#temp");
 
}

search("Vancouver");

let currentTemp = document.querySelector("#celcius");
currentTemp.addEventListener("click", celciusLink);

let currentTempF = document.querySelector("#fahrenheit");
currentTempF.addEventListener("click", fahrenheitLink);
