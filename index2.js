function formateDate(date) {
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
  
  let h3 = document.querySelector(".time-date");
  let currentTime = new Date();
  
  h3.innerHTML = formateDate(currentTime);
  
  function citySearch(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
  
    let headlineCity = document.querySelector("#headline-city");
    if (inputCity.value) {
      headlineCity.innerHTML = `${inputCity.value}`;
  
      let apiKey = "f1c77eff562f2c8461f69c753ac36d7d";
      let city = headlineCity.innerHTML;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  
      function showTemperature(response) {
        headlineCity.innerHTML = `${response.data.name}, ${
          response.data.sys.country
        }`;
        let temperature = Math.round(response.data.main.temp);
        let temperatureElement = document.querySelector("#temperature-numbers");
        temperatureElement.innerHTML = `${temperature}`;
        let maxTemp = document.querySelector("#max");
        maxTemp.innerHTML = Math.round(response.data.main.temp_max);
        let minTemp = document.querySelector("#min");
        minTemp.innerHTML = Math.round(response.data.main.temp_min);
        let feelslike = document.querySelector("#sensation");
        feelslike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = `${response.data.main.humidity}`;
        let windSpeed = document.querySelector("#wind");
        windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
      }
      axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    } else {
      inputCity.innerHTML = null;
      alert("Please enter a city");
    }
  }
  let searchCity = document.querySelector("#search-city");
  searchCity.addEventListener("submit", citySearch);
  
  function showTemp(event) {
    event.preventDefault();
    let tempChange = document.querySelector("#temperature-numbers");
    let temperature = tempChange.innerHTML;
    temperature = Number(temperature);
    tempChange.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  let tempFah = document.querySelector("#fahrenheit");
  tempFah.addEventListener("click", showTemp);
  
  function backTemp(event) {
    event.preventDefault();
    let originalTemp = document.querySelector("#temperature-numbers");
    let temperature = originalTemp.innerHTML;
    temperature = Number(temperature);
    originalTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  }
  let tempCel = document.querySelector("#celsius");
  tempCel.addEventListener("click", backTemp);
  let apiKey = "f1c77eff562f2c8461f69c753ac36d7d";
  
  function showCity(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature-numbers");
    temperatureElement.innerHTML = `${temperature}`;
    let maxTemp = document.querySelector("#max");
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    let minTemp = document.querySelector("#min");
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    let feelslike = document.querySelector("#sensation");
    feelslike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
  }
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let button = document.querySelector("button");
  button.addEventListener("click", getCurrentPosition);
  