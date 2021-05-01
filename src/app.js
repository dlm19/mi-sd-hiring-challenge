import { convertDate } from "./utils";

const Http = new XMLHttpRequest();
const baseLocationUrl = 'https://se-weather-api.herokuapp.com/api/v1/geo';
const baseWeatherUrl = 'https://se-weather-api.herokuapp.com/api/v1/forecast';

// I really want to type this zipCode variable to be a string;
const locationData = zipCode => {
  const url = baseLocationUrl + `?zip_code=${zipCode}`;
  Http.open("GET", url);
  Http.send()

  // Should check state of request
  return Http.onreadystatechange = e => {
    console.log(JSON.parse(Http.responseText));
  }
}

const location = locationData('90210');

const weatherData = (location) => {
  const date = new Date().toLocaleDateString();
  const {latitude, longitude} = location;
  const url = baseWeatherUrl + `?latitude=${latitude}&longitude=${longitude}&date=${date}`;

  Http.open("GET", url);
  Http.send();

  return Http.onreadystatechange = e => {
    const data = JSON.parse(Http.responseText);
    console.log(data)
    // data.daily.data.forEach(element => {
    //   document.write(`<p>${element}</p>`)
    // });
    document.write(`<p>${Http.responseText}</p>`)
  }
}

const weather = weatherData(location);
