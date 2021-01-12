function getSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);

}


function search(city) {

  let units = "metric";
  let apiKey = "21bc8603ffd9249d88b5d175d531dd75";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
}


function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h6>
        ${formatHours(forecast.dt * 1000)}
      </h6>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

let searchForm = document.querySelector("#search-city-form");
 searchForm.addEventListener("submit", getSearch);

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
  farenheitTemp = Math.round((feelsLike * 9) / 5 + 32);

  

  feels.innerHTML = `${feelsLike}ºC | ${farenheitTemp}ºF`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  tempElement.innerHTML = temp;
  description.innerHTML = response.data.weather[0].description;
  emojiElement.setAttribute("src", 
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  emojiElement.setAttribute("alt",
  response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

}
// I decided to change Precipitation for "Feels like temperature"

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
let farenheitTemp = null;

let celTemp = document.querySelector("#cel");
celTemp.addEventListener("click", showCel);

let farTemp = document.querySelector("#far");
farTemp.addEventListener("click", showFar);



function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

search("London");
