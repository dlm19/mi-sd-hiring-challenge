/**
 *
 * @param {number} time - Unix time in seconds returns it in miliseconds
 */
export function convertDate(time) {
  return time * 1000;
}

const baseLocationUrl = 'https://se-weather-api.herokuapp.com/api/v1/geo';
const baseWeatherUrl = 'https://se-weather-api.herokuapp.com/api/v1/forecast';

export async function getLocation(zipCode) {
  try {
  const url = baseLocationUrl + `?zip_code=${zipCode}`;
  const response = await fetch(url);

  return await response.json();
} catch (error) {
    console.log(error);
  }
}

export async function getWeather(latitude, longitude) {
  try {
    const date = new Date().toLocaleDateString();
    const url = baseWeatherUrl + `?latitude=${latitude}&longitude=${longitude}&date=${date}`;
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export function convertEpochDate(epoch) {
  return new Date(convertDate(epoch)).toLocaleDateString()
}

export function createTempString(high, low) {
  const highTemp = Math.round(high);
  const lowTemp = Math.round(low);

  return `${highTemp}° / ${lowTemp}° F`
}

