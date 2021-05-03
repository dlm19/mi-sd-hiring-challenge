import {
  getLocation,
  getWeather,
  convertEpochDate,
  createTempString
} from "./utils";

function renderHeader(city) {
  const app = document.getElementById('app');

  const newElement = document.createElement('h1');
  newElement.setAttribute("id", "header");
  newElement.innerHTML = `Weather Forecast for ${city}`;

  app.appendChild(newElement);
}

function renderDays(days) {
  const header = document.getElementById('header');

  return days.forEach(day => {
    const date = convertEpochDate(day.time);
    const temperature = createTempString(day.temperatureHigh, day.temperatureLow);

    const element = document.createElement('div');
    element.classList.add('date');

    header.append(element);

    const weather = document.createElement('p');
    weather.style.fontSize = "18px";
    weather.innerHTML = `${date}<br>\
    ${day.summary}<br>\
    ${temperature}`;

    element.append(weather);
  })
}

async function getData(zipCode) {
  try {
    const locationData = await getLocation(zipCode);
    const weatherData = await getWeather(locationData.latitude, locationData.longitude);

    renderHeader(locationData.city);
    renderDays(weatherData.daily.data);
  } catch (error) {
    console.log(error);
  }
}

getData("90210")

/*
NEXT STEPS:
- Create CSS file to add more styling
- Update convertEpochDate function (or create a new function that uses it) to convert dates to Today/Tomorrow/Upcoming, etc
- With these two steps, I would probably change the date class elements structure:
  div -> for each date
  div.children -> [Header for Today, div for icon and temp]
  div.children -> [icon on left, div on right for description, temps]
  div.children -> [description, tempteratures]
- Create input on the browser to take in a zip code and rerender
*/
