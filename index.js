
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `<div class="col-2">
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="icon" width="42" /><br /> ${formatDay(forecastDay.dt)}<br /> <strong>  ${Math.round(forecastDay.temp.max)}° </strong>| ${Math.round(forecastDay.temp.min)}°
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML; 
  }

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "afd2be167f88dd904bc213780db71233";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}
function showTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherIcon = response.data.weather[0].icon;
  document.querySelector("h2").innerHTML = `${city}`;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
  celciusTemperature = response.data.main.temp;
  mphWind = (response.data.wind.speed)/1.609;
  kmphWind = Math.round(response.data.wind.speed);
  
  getForecast(response.data.coord);
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
 
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "afd2be167f88dd904bc213780db71233";
  let units = "metric";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(showCurrentTemperature);


}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);


function celciusLink(event) {
  event.preventDefault();
   currentTemp.classList.add("active");
  currentTempF.classList.remove("active");
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celciusTemperature);
}
function fahrenheitLink(event) {
  event.preventDefault();
  currentTemp.classList.remove("active");
  currentTempF.classList.add("active");
  let temperatureF = document.querySelector("#temp");
  temperatureF.innerHTML = Math.round((celciusTemperature * 9 / 5) + 32);
 
}

function mphLink(event) {
  event.preventDefault();
  windspeedKM.classList.remove("active");
  windspeedMPH.classList.add("active");
  document.querySelector("#wind").innerHTML = Math.round(mphWind);
}

function kmphLink(event) {
  event.preventDefault();
  windspeedKM.classList.add("active");
  windspeedMPH.classList.remove("active");
  document.querySelector("#wind").innerHTML = kmphWind;
}

let celciusTemperature = null;
let kmphWind = null;
let mphWind = null;

let windspeedKM = document.querySelector("#kmph");
windspeedKM.addEventListener("click", kmphLink);

let windspeedMPH = document.querySelector("#mph");
windspeedMPH.addEventListener("click", mphLink);

let currentTemp = document.querySelector("#celcius");
currentTemp.addEventListener("click", celciusLink);

let currentTempF = document.querySelector("#fahrenheit");
currentTempF.addEventListener("click", fahrenheitLink);


  

search("New York");