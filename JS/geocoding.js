import { ajaxRequest } from './request.js';

export async function getCitySuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=0&limit=5`;

    try {
        const data = await ajaxRequest({ url, method: 'GET' });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des suggestions :', error);
        return [];
    }
}