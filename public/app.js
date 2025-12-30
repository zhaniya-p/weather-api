async function getData() {
  const city = document.getElementById("cityInput").value;

  const weatherRes = await fetch(`/api/weather?city=${city}`);
  const weather = await weatherRes.json();

  document.getElementById("weather").innerHTML = `
    <h2>${weather.city}, ${weather.country}</h2>
    <p>${weather.description}</p>
    <p>Temp: ${weather.temperature}°C</p>
    <p>Feels like: ${weather.feels_like}°C</p>
  `;

  const map = L.map("map").setView(
    [weather.coordinates.lat, weather.coordinates.lon],
    10
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([weather.coordinates.lat, weather.coordinates.lon]).addTo(map);

  const newsRes = await fetch(`/api/news?city=${city}`);
  const news = await newsRes.json();

  document.getElementById("news").innerHTML =
    "<h3>News</h3>" +
    news.articles.map(a => `<p>${a.title}</p>`).join("");

  const currencyRes = await fetch(`/api/currency`);
  const currency = await currencyRes.json();

  document.getElementById("currency").innerHTML = `
    <h3>Currency (USD)</h3>
    <p>EUR: ${currency.rates.EUR}</p>
    <p>KZT: ${currency.rates.KZT}</p>
    <p>RUB: ${currency.rates.RUB}</p>
  `;
}