import DailyWeather from './DailyWeather.js';
import WeatherCard from './WeatherCard.js';

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

// Section pour la météo du jour
const todaySection = document.createElement('div');
todaySection.classList.add('today');
container.appendChild(todaySection);

// Section pour les cartes des 7 prochains jours
const forecastSection = document.createElement('div');
forecastSection.classList.add('forecast');
container.appendChild(forecastSection);

// Ajout de la météo du jour
const daily = new DailyWeather("Melun", "15/01", '/asset/sun.png', 25);
todaySection.appendChild(daily.create());

// Ajout des prévisions météo
const cards = [
    new WeatherCard("16/01", '/asset/sun.png', 25),
    new WeatherCard("17/01", '/asset/cloud.png', 18),
    new WeatherCard("18/01", '/asset/sun.png', 22),
    new WeatherCard("19/01", '/asset/variable.png', 22),
    new WeatherCard("20/01", '/asset/sun.png', 22),
    new WeatherCard("21/01", '/asset/storm.png', 22),
    new WeatherCard("22/01", '/asset/variable.png', 22),
];

cards.forEach(card => forecastSection.appendChild(card.create()));
