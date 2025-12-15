async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const { lat, lon } = await getGeoLoc(city);
  console.log(lat, lon);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b15705df5cff636fe1ea888e4bf0f9dc`
  );
  const data = await response.json();
  document.getElementById("weatherData").innerHTML = `
        <div>
            <p><h5>City : ${data.name}</h5></p>
            <p>Temperature : ${(data.main.temp - 273.14).toFixed(2)}°C</p>
            <p>Humitdity : ${data.main.humidity}%</p>
            <p>Description : ${data.weather[0].description}</p>
        </div>
        <img
            src="https://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@4x.png"
            alt="weatherIcon"
        />
  `;
  document.getElementById("city").value = "";
}
async function getGeoLoc(city) {
  console.log(city);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=b15705df5cff636fe1ea888e4bf0f9dc`
  );
  const data = await response.json();

  const lat = data[0].lat;
  const lon = data[0].lon;

  return { lat, lon };
}
