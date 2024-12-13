import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';   
import { hourlyData, weeklyData } from './data.js';

const currentWeather = new CurrentWeather(
    'Paris, France',
    '../asset/sun.png',
    28,
    'Sunny'
);
app.appendChild(currentWeather.create());

// Créer les cartes avec les données météo
const hourlyForecast = new WeatherForecast(hourlyData, 'hourly');
const dailyForecast = new WeatherForecast(weeklyData, 'daily');

// Ajouter les cartes dans le DOM
document.getElementById('app').appendChild(hourlyForecast.create());
document.getElementById('app').appendChild(dailyForecast.create());
