import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';
import { WeatherDetail } from './WeatherDetail.js';
import { hourlyData, weeklyData, weatherDetails } from './data.js';
import { debounce } from './utils.js'; // Import de debounce
import { getCitySuggestions } from './geocoding.js'; // Import de getCitySuggestions
import { getForecast } from './forecast.js';


const currentWeather = new CurrentWeather(
    'Paris, France',
    '../asset/rain.png',
    28,
    'Rain'
);

// Conteneur principal pour les détails météo
const detailsContainer = document.getElementById('detail');

// Ajouter chaque carte de détail au conteneur
weatherDetails.forEach(detail => {
    const card = new WeatherDetail(detail.iconSrc, detail.label, detail.value);
    detailsContainer.appendChild(card.create());
});

// Créer les cartes avec les données météo
const hourlyForecast = new WeatherForecast(hourlyData, 'hourly');
const dailyForecast = new WeatherForecast(weeklyData, 'daily');

// Ajouter les cartes dans le DOM
document.getElementById('current').appendChild(currentWeather.create());
document.getElementById('forecast').appendChild(hourlyForecast.create());
document.getElementById('forecast').appendChild(dailyForecast.create());

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

// Fonction de gestion de la sélection de la ville
function handleCitySelection(suggestion) {
    console.log(`Ville sélectionnée : ${suggestion.display_name}`);

}

// Fermer les suggestions lorsqu'on clique en dehors
document.addEventListener('click', (e) => {
    const suggestionsBox = document.getElementById('suggestions');
    if (suggestionsBox && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});

// Initialisation de l’autocomplétion
window.onload = initAutocomplete;