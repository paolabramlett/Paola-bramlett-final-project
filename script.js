function showSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");

  city.innerHTML = `${searchInput.value}`;

  let units = "metric";
  let apiKey = "21bc8603ffd9249d88b5d175d531dd75";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#search-city-form");
 searchForm.addEventListener("submit", showSearch);

function showTemp(response) {
console.log(response.data);

  let temp = Math.round(response.data.main.temp);

  let feelsLike = Math.round(response.data.main.feels_like);
  let description = document.querySelector("#description");
  let tempElement = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels = document.querySelector("#feels");
  let emojiElement = document.querySelector("#emoji1");
  let dateElement = document.querySelector("#date");

  celsiusTemp = temp; 

  feels.innerHTML = `${feelsLike}ºC`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  tempElement.innerHTML = temp;
  description.innerHTML = response.data.weather[0].description;
  emojiElement.setAttribute("src", 
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  emojiElement.setAttribute("alt",
  response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

}

function showFar(event) {
  event.preventDefault();

  let farTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(farTemp);
}

function showCel(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let celTemp = document.querySelector("#cel");
celTemp.addEventListener("click", showCel);

let farTemp = document.querySelector("#far");
farTemp.addEventListener("click", showFar);



let currentTime = new Date();

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(currentTime);





function showCurrentTemperature(response) {
  console.log(data);

  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let description = document.querySelector("#description");
  let tempElement = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels = document.querySelector("#feels");
  

  feels.innerHTML = `${feelsLike}ºC`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  description.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = temperature;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "21bc8603ffd9249d88b5d175d531dd75";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
  
}

function getCurrentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}


let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("Click", getCurrentPosition);

function displayTemperature(response) {
  console.log(response.data.main.temp);
}

