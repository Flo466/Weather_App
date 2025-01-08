import { ajaxRequest } from './request.js';

export async function getForecast(city) {
    // L'URL pointe maintenant vers ton serveur backend, pas l'API météo directement
    const url = `http://localhost:3001/forecast?city=${encodeURIComponent(city)}`;
    try {
        const forecast = await ajaxRequest({ url, method: 'GET' });
        console.log('Météo récupérée:', forecast);
        return forecast;
    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
    }
}