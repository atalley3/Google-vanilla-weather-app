function displayTempature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  tempElement.innerHTML = currentTemp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = windSpeed;
}

let apiKey = "bcdada43905d3c2d7aa9f45a7ce30f8b";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Asheville&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTempature);
