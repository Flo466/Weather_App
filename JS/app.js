import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';
import { WeatherDetail } from './WeatherDetail.js';
import { debounce, eraseSuggestions, getIconPath, limitArraySize } from './utils.js';
import { getCitySuggestions } from './geocoding.js';
import { getForecast } from './forecast.js';
import { weatherDetails } from './data.js';


// Initialisation de l’autocomplétion avec debounce
function initAutocomplete() {
    const input = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');

    if (!input) {
        console.error("L'élément #search n'existe pas dans le DOM !");
        return;
    }
    input.addEventListener('input', debounce(function () {
        const query = input.value.trim();
        console.log(`Recherche : ${query}`);
        if (query.length > 2) {
            getCitySuggestions(query).then(suggestions => {
                suggestionsBox.innerHTML = ''; // Vider les suggestions existantes
                if (suggestions.length > 0) {
                    suggestionsBox.style.display = 'block';
                    suggestions.forEach(suggestion => {
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
            suggestionsBox.style.display = 'none';
        }
    }, 350)); // 300ms de délai avant d'exécuter
}

function loadDefaultWeather() {
    const defaultCity = 'Paris'; // Ville par défaut
    getForecast(defaultCity)
        .then((forecast) => {
            console.log(`Données météo par défaut pour ${defaultCity}:`, forecast);
            updateAll(forecast); // Mettre à jour les données avec Paris
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des données météo par défaut:', error);
        });
}

function handleCitySelection(suggestion) {
    console.log(`Ville sélectionnée : ${suggestion.name}`);
    getForecast(suggestion.name)
        .then((forecast) => {
            console.log(`Données météo pour ${suggestion.name}:`, forecast);
            updateAll(forecast);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des données météo:', error);
        });
}

function updateCurrentWeather(forecast) {
    const currentWeather = new CurrentWeather(
        forecast.address,
        getIconPath(forecast.days[0].icon),
        Math.round(forecast.days[0].temp),
        forecast.days[0].conditions
      );
      
      // Afficher la météo actuelle avec animation
      const currentContainer = document.getElementById('current');
      currentContainer.innerHTML = '';
      currentContainer.appendChild(currentWeather.create());
      currentContainer.classList.add('fade-in-down'); // Ajouter l'animation
};

function updateForecast(forecast) {
    // Créer et afficher les prévisions horaires
    const hourlyArray = forecast.days[0].hours;
    const hourlyForecast = new WeatherForecast(limitArraySize(hourlyArray, 24), 'hourly');
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Réinitialiser les prévisions
    forecastContainer.appendChild(hourlyForecast.create());
    forecastContainer.classList.add('fade-in-up'); // Ajouter l'animation

    // Créer et afficher les prévisions journalières
    const dailyArray = forecast.days;
    const dailyForecast = new WeatherForecast(limitArraySize(dailyArray.slice(1), 14), 'daily');
    forecastContainer.appendChild(dailyForecast.create());
    forecastContainer.classList.add('fade-in-up'); // Ajouter l'animation
};

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
detailsContainer.classList.add('fade-in-up')
data.forEach((value, index) => {
    weatherDetails[index].value = value;
    const card = new WeatherDetail(
        weatherDetails[index].iconSrc,
        weatherDetails[index].label,
        weatherDetails[index].value
    );
    detailsContainer.appendChild(card.create());
});

};

async function updateAll(forecast) {
    try {
      updateCurrentWeather(forecast);
      await new Promise(resolve => setTimeout(resolve, 500));
      updateForecast(forecast);
      await new Promise(resolve => setTimeout(resolve, 500));
      updateDetails(forecast);
        
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la météo:", error);
    }
  }

eraseSuggestions();

window.onload = function () {
    loadDefaultWeather();
    initAutocomplete();
};