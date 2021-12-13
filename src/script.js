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

function displayTempature(response) {
  console.log(response.data);

  let currentTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
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
  windElement.innerHTML = windSpeed;
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", iconAlt);
}

let apiKey = "bcdada43905d3c2d7aa9f45a7ce30f8b";
let city = "Asheville";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTempature);
