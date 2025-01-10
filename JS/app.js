import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';
import { WeatherDetail } from './WeatherDetail.js';
import { weatherDetails } from './data.js';
import { debounce, getIconPath, limitArraySize } from './utils.js';
import { getCitySuggestions } from './geocoding.js';
import { getForecast } from './forecast.js';

// Conteneur principal pour les détails météo
const detailsContainer = document.getElementById('detail');

// Ajouter chaque carte de détail au conteneur
weatherDetails.forEach(detail => {
    const card = new WeatherDetail(detail.iconSrc, detail.label, detail.value);
    detailsContainer.appendChild(card.create());
});

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
    }, 300)); // 300ms de délai avant d'exécuter
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

let isPageLoaded = false; // Variable pour vérifier si la page est déjà chargée

async function updateAll(forecast) {
    try {
      // Créer l'objet CurrentWeather pour la météo actuelle
      const currentWeather = new CurrentWeather(
        forecast.address,
        getIconPath(forecast.days[0].icon),
        Math.round(forecast.days[0].temp),
        forecast.days[0].conditions
      );
      
      await new Promise(resolve => setTimeout(resolve, 700));

      // Afficher la météo actuelle avec animation
      const currentContainer = document.getElementById('current');
      currentContainer.innerHTML = '';
      currentContainer.appendChild(currentWeather.create());
      currentContainer.classList.add('fade-in'); // Ajouter l'animation
  
      await new Promise(resolve => setTimeout(resolve, 400));

      // Créer et afficher les prévisions horaires
      const hourlyArray = forecast.days[0].hours;
      const hourlyForecast = new WeatherForecast(limitArraySize(hourlyArray, 24), 'hourly');
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; // Réinitialiser les prévisions
      forecastContainer.appendChild(hourlyForecast.create());
      forecastContainer.classList.add('fade-in'); // Ajouter l'animation
  
      // Créer et afficher les prévisions journalières
      const dailyArray = forecast.days;
      const dailyForecast = new WeatherForecast(limitArraySize(dailyArray.slice(1), 14), 'daily');
      forecastContainer.appendChild(dailyForecast.create());
      forecastContainer.classList.add('fade-in'); // Ajouter l'animation
  
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la météo:", error);
    } finally {
      // Masquer le spinner une fois le contenu chargé
      document.getElementById('loading').style.display = 'none';
    }
  }
  

// Fermer les suggestions lorsqu'on clique en dehors
document.addEventListener('click', (e) => {
    const suggestionsBox = document.getElementById('suggestions');
    if (suggestionsBox && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});

// Initialisation de l’autocomplétion
window.onload = function () {
    loadDefaultWeather();
    initAutocomplete();
};