function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let amOrPm = "AM";

  if (hours >= 12) {
    amOrPm = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${days[day]} ${hours}:${minutes} ${amOrPm}`;
}
function formateForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 futureDayForecast">
            <ul>
              <li>${formateForecastDay(forecastDay.dt)}</li>
              <li>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="${forecastDay.weather[0].main}"
                  class="futureWeatherIcon"
                />
              </li>
              <li>
                <span class="futureHigh">${Math.round(
                  forecastDay.temp.max
                )}º</span
                ><span class="futureLow">   ${Math.round(
                  forecastDay.temp.min
                )}º</span>
              </li>
            </ul>
          </div>`;
      forecastElement.innerHTML = `${forecastHTML} </div>`;
    }
  });
}

function sendCoords(response) {
  let lon = response.lon;
  let lat = response.lat;
  let apiKey = "bcdada43905d3c2d7aa9f45a7ce30f8b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTempature(response) {
  fTemp = response.data.main.temp;
  imperialWind = Math.round(response.data.wind.speed);

  let currentTemp = Math.round(fTemp);
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = imperialWind;
  let icon = response.data.weather[0].icon;
  let iconAlt = response.data.weather[0].main;

  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = currentTemp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = `${windSpeed} MPH`;
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", iconAlt);

  sendCoords(response.data.coord);
}
function search(city) {
  let apiKey = "bcdada43905d3c2d7aa9f45a7ce30f8b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTempature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let fTemp = null;
let imperialWind = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

search("Asheville");
