import { WeatherForecast } from './components/WeatherForecast.js';
import { CurrentWeather } from './components/CurrentWeather.js';
import { WeatherDetail } from './components/WeatherDetail.js';
import { debounce, eraseSuggestions, getIconPath, limitArraySize } from './utils/utils.js';
import { getCitySuggestions } from './geocoding.js';
import { getForecast } from './forecast.js';
import { weatherDetails } from './utils/data.js';

// Initialize autocomplete functionality for the search bar
function initAutocomplete() {
    const input = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');

    if (!input) {
        console.error("Element #search is missing in the DOM!");
        return;
    }
    
    // Add input event listener with debounce for efficiency
    input.addEventListener('input', debounce(function () {
        const query = input.value.trim();
        console.log(`Searching for: ${query}`);
        
        if (query.length > 2) {
            // Fetch city suggestions based on the query
            getCitySuggestions(query).then(suggestions => {
                suggestionsBox.innerHTML = ''; // Clear existing suggestions
                if (suggestions.length > 0) {
                    suggestionsBox.style.display = 'block';
                    suggestions.forEach(suggestion => {
                        // Create suggestion item and append to suggestions box
                        const item = document.createElement('div');
                        item.classList.add('suggestion-item');
                        item.innerText = suggestion.display_name;
                        item.addEventListener('click', () => {
                            input.value = suggestion.display_name;
                            suggestionsBox.style.display = 'none';
                            handleCitySelection(suggestion);
                        });
                        suggestionsBox.appendChild(item);
                    });
                } else {
                    suggestionsBox.style.display = 'none';
                }
            });
        } else {
            suggestionsBox.style.display = 'none'; // Hide suggestions for short queries
        }
    }, 350));
}

/**
 * Fetch weather data for a given city and update the UI.
 * @param {string} cityName - Name of the city to fetch weather data for.
 * @param {string} logMessage - Log message to display in the console.
 */
function fetchAndUpdateWeather(cityName, logMessage) {
    console.log(logMessage, cityName);
    getForecast(cityName)
        .then((forecast) => {
            console.log(`Weather data for ${cityName}:`, forecast);
            updateAll(forecast);
        })
        .catch((error) => {
            console.error(`Error fetching weather data for ${cityName}:`, error);
        });
}

function loadDefaultWeather() {
    const defaultCity = 'Paris';
    fetchAndUpdateWeather(defaultCity, 'Loading default weather data for');
}

/**
 * Handle city selection and fetch forecast data for the selected city.
 * @param {Object} suggestion - Selected city suggestion object containing the city name.
 */
function handleCitySelection(suggestion) {
    fetchAndUpdateWeather(suggestion.name, 'Selected city:');
}


// Update current weather display with animation
function updateCurrentWeather(forecast) {
    const currentWeather = new CurrentWeather(
        forecast.address,
        getIconPath(forecast.days[0].icon),
        Math.round(forecast.days[0].temp),
        forecast.days[0].conditions
    );

    const currentContainer = document.getElementById('current');
    currentContainer.innerHTML = '';
    currentContainer.appendChild(currentWeather.create());
    currentContainer.classList.add('fade-in-down'); // Add fade-in animation
}

// Update hourly and daily weather forecast with animations
function updateForecast(forecast) {
    const hourlyArray = forecast.days[0].hours;
    const hourlyForecast = new WeatherForecast(limitArraySize(hourlyArray, 24), 'hourly');
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Reset forecast container
    forecastContainer.appendChild(hourlyForecast.create());
    forecastContainer.classList.add('fade-in-up'); // Add fade-in animation

    const dailyArray = forecast.days;
    const dailyForecast = new WeatherForecast(limitArraySize(dailyArray.slice(1), 14), 'daily');
    forecastContainer.appendChild(dailyForecast.create());
    forecastContainer.classList.add('fade-in-up'); // Add fade-in animation
}

// Update detailed weather information with animations
function updateDetails(forecast) {
    const currentDay = forecast.days[0];
    const data = [
        `${Math.round(currentDay.tempmax)}°C / ${Math.round(currentDay.tempmin)}°C`,
        currentDay.sunset.substring(0, 5),
        `${Math.round(currentDay.feelslike)}°C`,
        currentDay.uvindex,
        `${currentDay.humidity} %`,
        `${currentDay.windspeed} km/h`
    ];
    console.log(data);

    const detailsContainer = document.getElementById('detail');
    detailsContainer.innerHTML = '';
    detailsContainer.classList.add('fade-in-up');
    data.forEach((value, index) => {
        weatherDetails[index].value = value;
        const card = new WeatherDetail(
            weatherDetails[index].iconSrc,
            weatherDetails[index].label,
            weatherDetails[index].value
        );
        detailsContainer.appendChild(card.create());
    });
}

// Update all sections of the weather display with animations
async function updateAll(forecast) {
    try {
        updateCurrentWeather(forecast);
        await new Promise(resolve => setTimeout(resolve, 500));
        updateForecast(forecast);
        await new Promise(resolve => setTimeout(resolve, 500));
        updateDetails(forecast);
    } catch (error) {
        console.error("Error updating weather data:", error);
    }
}

// Clear city suggestions when input loses focus
eraseSuggestions();

// On page load, initialize default weather data and autocomplete
window.onload = function () {
    loadDefaultWeather();
    initAutocomplete();
};
