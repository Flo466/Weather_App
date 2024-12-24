import { ajaxRequest } from './request.js';

export function getCitySuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=0&limit=5`;

    return ajaxRequest({ url, method: 'GET' })
        .then(data => {
            return data; // Retourner les données récupérées pour une utilisation ultérieure
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des suggestions :', error);
            return []; // Retourner un tableau vide en cas d'erreur
        });
}