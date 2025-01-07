import { ajaxRequest } from './request.js';  // Assure-toi que ta fonction ajaxRequest est importée

export async function getWeather(city) {
    // L'URL pointe maintenant vers ton serveur backend, pas l'API météo directement
    const url = `http://localhost:3000/forecast?city=${encodeURIComponent(city)}`;

    try {
        const response = await ajaxRequest({ url, method: 'GET' });
        // Traite la réponse ici
        console.log('Météo récupérée:', response);
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
    }
}
