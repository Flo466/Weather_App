import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';
import { WeatherDetail } from './WeatherDetail.js';
import { hourlyData, weeklyData, weatherDetails } from './data.js';
import { getCitySuggestions } from './autocomplete.js';


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
current.appendChild(currentWeather.create());
document.getElementById('forecast').appendChild(hourlyForecast.create());
document.getElementById('forecast').appendChild(dailyForecast.create());

function initAutocomplete() {
    const input = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');

    if (!input) {
        console.error("L'élément #search n'existe pas dans le DOM !");
        return;
    }

    input.addEventListener('input', function() {
        const query = input.value.trim();
        console.log(`Recherche : ${query}`);
        if (query) {
            getCitySuggestions(query); // Appeler la fonction AJAX pour récupérer les suggestions
        } else {
            suggestionsBox.style.display = 'none'; // Cacher les suggestions si vide
        }
    });
}

// Initialisation de l’autocomplétion
window.onload = initAutocomplete;

