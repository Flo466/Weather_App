import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';
import { WeatherDetail } from './WeatherDetail.js';
import { hourlyData, weeklyData, weatherDetails } from './data.js';

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
document.getElementById('hourly').appendChild(hourlyForecast.create());
document.getElementById('daily').appendChild(dailyForecast.create());
