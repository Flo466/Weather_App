import { ajaxRequest } from './request.js';

export async function getForecast(city) {
    const url = `http://localhost:3002/forecast?city=${encodeURIComponent(city)}`;
    try {
        const forecast = await ajaxRequest({ url, method: 'GET' });
        return forecast;
    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
    }
}