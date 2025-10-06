const apiKey = "73ae0fe524fc204b2200859624b76a1b"; // Replace this with your real OpenWeatherMap API key
const searchBox = document.getElementById("search");
const weatherDiv = document.getElementById("weather");

async function getWeather(city) {
  if (!city) return;

  weatherDiv.innerHTML = "<h3 style='color:white;'>Loading...</h3>";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === "404") {
    weatherDiv.innerHTML = "<h3 style='color:white;'>City not found 😢</h3>";
    return;
  }

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const temp = `${Math.round(data.main.temp)}℃`;
  const desc = data.weather[0].main;

  weatherDiv.innerHTML = `
    <div>
      <img src="${icon}" alt="">
    </div>
    <div>
      <h2>${temp}</h2>
      <h4>${desc}</h4>
    </div>
  `;
}

searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather(searchBox.value.trim());
  }
});
