import { ajaxRequest } from './request.js';

export function getCitySuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;

    ajaxRequest({ url, method: 'GET' })
        .then(data => {
            console.log(`Suggestions reçues :`, data);

            const suggestionsBox = document.getElementById('suggestions');
            suggestionsBox.innerHTML = ''; // Vider les suggestions existantes

            if (data.length > 0) {
                suggestionsBox.style.display = 'block';
                data.forEach(suggestion => {
                    const item = document.createElement('div');
                    item.classList.add('suggestion-item');
                    item.innerText = suggestion.display_name; // Affiche le nom complet
                    item.addEventListener('click', () => {
                        document.getElementById('search').value = suggestion.display_name;
                        suggestionsBox.style.display = 'none';

                        // Appeler la fonction pour gérer la sélection de la ville
                        handleCitySelection(suggestion);
                    });
                    suggestionsBox.appendChild(item);
                });
            } else {
                suggestionsBox.style.display = 'none'; // Cacher si aucune suggestion
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des suggestions :', error);
        });
}
