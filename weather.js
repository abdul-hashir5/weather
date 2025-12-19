const API_KEY = "b2865269131418133b5fc99f491052fc";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const weatherBox = document.getElementById("weatherBox");
const forecastDiv = document.getElementById("forecast");
const errorMsg = document.getElementById("errorMsg");
const recentCities = document.getElementById("recentCities");

/* Save recent cities */
function saveCity(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  loadCities();
}

/* Load recent cities */
function loadCities() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (cities.length === 0) return;

  recentCities.classList.remove("hidden");
  recentCities.innerHTML = cities
    .map(city => `<option value="${city}">${city}</option>`)
    .join("");
}

/* Fetch weather by city */
async function fetchWeather(city) {
  try {
    errorMsg.classList.add("hidden");

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);
    fetchForecast(data.coord.lat, data.coord.lon);
    saveCity(city);
    changeBackground(data.weather[0].main);
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.classList.remove("hidden");
  }
}

/* Display current weather */
function displayWeather(data) {
  weatherBox.classList.remove("hidden");
  weatherBox.innerHTML = `
    <h3 class="text-xl font-bold mb-2">${data.name}</h3>
    <p>🌡 Temperature: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
  `;

  if (data.main.temp > 40) {
    weatherBox.innerHTML += `
      <p class="text-red-600 font-bold mt-2">⚠ Extreme Heat Alert!</p>
    `;
  }
}

/* 5-day forecast */
async function fetchForecast(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();
  forecastDiv.innerHTML = "";

  const dailyData = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  dailyData.forEach(day => {
    const date = new Date(day.dt * 1000).toDateString();
    forecastDiv.innerHTML += `
      <div class="bg-white p-4 rounded-xl shadow">
        <h4 class="font-semibold">${date}</h4>
        <p>🌡 ${day.main.temp} °C</p>
        <p>🌬 ${day.wind.speed} m/s</p>
        <p>💧 ${day.main.humidity}%</p>
      </div>
    `;
  });
}

/* Background change */
function changeBackground(condition) {
  document.body.className = "";

  if (condition.includes("Rain")) {
    document.body.classList.add("rainy");
  } else if (condition.includes("Cloud")) {
    document.body.classList.add("cloudy");
  } else {
    document.body.classList.add("sunny");
  }
}

/* Events */
searchBtn.onclick = () => {
  if (cityInput.value === "") {
    errorMsg.textContent = "Please enter a city name";
    errorMsg.classList.remove("hidden");
    return;
  }
  fetchWeather(cityInput.value);
};

currentLocationBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    displayWeather(data);
    fetchForecast(latitude, longitude);
    changeBackground(data.weather[0].main);
  });
};

recentCities.onchange = () => fetchWeather(recentCities.value);

loadCities();

