// ---- Grab all the HTML elements we need to update ----
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const feelsLikeEl = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const feelEl = document.getElementById("feel");
const aqiEl = document.getElementById("aqi");

const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

let tempChart = null; // will hold our Chart.js chart

// Live clock (updates every second)
function updateClock() {
  const now = new Date();

  dateEl.innerHTML = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  timeEl.innerHTML = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
updateClock();
setInterval(updateClock, 1000);

// Turn a "unix" timestamp (seconds) into a readable time like "06:12 AM"
function formatTime(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Show / hide a simple loading state on the highlight cards
function showLoading() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("loading");
  });
}
function hideLoading() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("loading");
  });
}

// Get current weather by CITY NAME
async function getWeatherByCity(cityName) {
  showLoading();
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();
    updateCurrentWeather(data);
  } catch (err) {
    hideLoading();
    alert(err.message);
  }
}

// Get current weather by COORDINATES (used for "my location")
async function getWeatherByCoords(lat, lon) {
  showLoading();
  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      throw new Error("Could not load weather for your location");
    }

    const data = await res.json();
    updateCurrentWeather(data);
  } catch (err) {
    hideLoading();
    alert(err.message);
  }
}

// Update the whole page once we have weather data
function updateCurrentWeather(data) {
  cityEl.innerHTML = `${data.name}, ${data.sys.country}`;
  tempEl.innerHTML = `${Math.round(data.main.temp)}°`;
  conditionEl.innerHTML = data.weather[0].description;
  feelsLikeEl.innerHTML = `${Math.round(data.main.feels_like)}°`;
  feelEl.innerHTML = `${Math.round(data.main.feels_like)}°`;

  humidityEl.innerHTML = `${data.main.humidity}%`;
  windEl.innerHTML = `${Math.round(data.wind.speed * 3.6)} km/h`; // m/s -> km/h
  pressureEl.innerHTML = `${data.main.pressure} hPa`;
  visibilityEl.innerHTML = `${(data.visibility / 1000).toFixed(1)} km`;

  sunriseEl.innerHTML = formatTime(data.sys.sunrise);
  sunsetEl.innerHTML = formatTime(data.sys.sunset);

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherIcon.alt = data.weather[0].description;

  changeBackground(data.weather[0].main);

  // Save coordinates so we can fetch the forecast + air quality too
  const { lat, lon } = data.coord;
  getForecast(lat, lon);
  getAirQuality(lat, lon);

  hideLoading();
}

// 5 Day Forecast (OpenWeatherMap's free plan gives 3-hour steps)
async function getForecast(lat, lon) {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const data = await res.json();

    updateForecastCards(data);
    drawChart(data);
  } catch (err) {
    console.log(err);
  }
}

// Show one card per day (using the reading closest to midday)
function updateForecastCards(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  const dailyReadings = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  dailyReadings.slice(0, 5).forEach((day) => {
    const dayDate = new Date(day.dt * 1000);

    const card = document.createElement("div");
    card.className = "forecast-item";

    card.innerHTML = `
      <h4>${dayDate.toLocaleDateString("en-US", { weekday: "short" })}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
      <h3>${Math.round(day.main.temp)}°</h3>
      <p>${day.weather[0].main}</p>
    `;

    forecastContainer.appendChild(card);
  });
}

// Air Quality Index
async function getAirQuality(lat, lon) {
  try {
    const res = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    const data = await res.json();
    const value = data.list[0].main.aqi; // 1 (good) to 5 (very poor)

    const levels = [
      "",
      "Good",
      "Fair",
      "Moderate",
      "Poor",
      "Very Poor",
    ];
    aqiEl.textContent = levels[value];
  } catch (err) {
    console.log(err);
  }
}

// Change the page background to match the weather
function changeBackground(weatherMain) {
  const body = document.body;
  const condition = weatherMain.toLowerCase();

  if (condition.includes("clear")) {
    body.style.background = "linear-gradient(135deg, #4f46e5, #0ea5e9)";
  } else if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(135deg, #334155, #0f172a)";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.style.background = "linear-gradient(135deg, #0f766e, #164e63)";
  } else if (condition.includes("thunder")) {
    body.style.background = "linear-gradient(135deg, #1e1b4b, #312e81)";
  } else {
    body.style.background =
      "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)";
  }
}

// Search box events
searchBtn.addEventListener("click", () => {
  const cityName = searchInput.value.trim();
  if (cityName !== "") {
    getWeatherByCity(cityName);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Try the user's location first, otherwise fall back to a default city
function loadInitialWeather() {
  const defaultCity = "Bhopal"; // fallback if geolocation fails

  if (!navigator.geolocation) {
    getWeatherByCity(defaultCity);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    },
    () => {
      // user said no to location access, or it failed
      getWeatherByCity(defaultCity);
    },
  );
}

window.addEventListener("load", loadInitialWeather);

// Friendly error message if something unexpected breaks
window.addEventListener("unhandledrejection", () => {
  hideLoading();
  alert("Something went wrong. Please try again.");
});

console.log("WeatherApp loaded ✅");
