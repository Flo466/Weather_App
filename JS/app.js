import { WeatherForecast } from './WeatherForecast.js';
import { CurrentWeather } from './CurrentWeather.js';   
import { hourlyData, weeklyData } from './data.js';

const currentWeather = new CurrentWeather(
    'Paris, France',
    '../asset/storm.png',
    28,
    'Sunny'
);

// Créer les cartes avec les données météo
const hourlyForecast = new WeatherForecast(hourlyData, 'hourly');
const dailyForecast = new WeatherForecast(weeklyData, 'daily');

// Ajouter les cartes dans le DOM
app.appendChild(currentWeather.create());
document.getElementById('hourly').appendChild(hourlyForecast.create());
document.getElementById('daily').appendChild(dailyForecast.create());
