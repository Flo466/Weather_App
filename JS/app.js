import { WeatherForecast } from './WeatherForecast.js';
import { hourlyData, weeklyData } from './data.js';

// Créer les cartes avec les données météo
const hourlyForecast = new WeatherForecast(hourlyData, 'hourly');
const dailyForecast = new WeatherForecast(weeklyData, 'daily');

// Ajouter les cartes dans le DOM
document.getElementById('app').appendChild(hourlyForecast.create());
document.getElementById('app').appendChild(dailyForecast.create());
