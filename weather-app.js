// 
const API_KEY = 'D4MUM3SB4MTNYNKGPB8RD39QB';

async function searchWeather() {
  const location = document.getElementById('locationInput').value.trim();
  if (!location) {
    alert('Please enter a location');
    return;
  }

  const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=D4MUM3SB4MTNYNKGPB8RD39QB&contentType=json`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Fetch error:', error.message);
    document.getElementById('weather').innerText = 'Could not fetch weather data. Please try again.';
  }
}

function processWeatherData(data) {
  if (!data || !data.days || data.days.length === 0) return null;

  const today = data.days[0];

  return {
    location: `${data.resolvedAddress}`,
    temperatureC: today.temp,
    temperatureF: (today.temp * 9/5) + 32,
    description: today.conditions,
    icon: today.icon, // This is a keyword like "rain", "clear-day", etc.
    main: today.icon
  };
}

document.getElementById('location-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = document.getElementById('locationInput').value.trim();
  if (!location) return;

  const rawData = await getWeatherData(location);
  const weather = processWeatherData(rawData);
  displayWeather(weather);
});

function displayWeather(data) {
  const weatherDiv = document.getElementById('weather');
  const today = data.days[0];
  weatherDiv.innerHTML = `
    <h2>Weather for ${data.resolvedAddress}</h2>
    <p>Temperature: ${today.temp}°C</p>
    <p>Conditions: ${today.conditions}</p>
  `;
}