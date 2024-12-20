export function getCitySuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;

    console.log(`Requête envoyée : ${url}`);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                const suggestionsBox = document.getElementById('suggestions');
                suggestionsBox.innerHTML = ''; // Vider les suggestions existantes

                if (data.length > 0) {
                    suggestionsBox.style.display = 'block'; // Afficher les suggestions
                    data.forEach(function(suggestion) {
                        const item = document.createElement('div');
                        item.classList.add('suggestion-item');
                        item.innerText = suggestion.display_name; // Affiche le nom de la ville et autres détails
                        item.addEventListener('click', function() {
                            document.getElementById('search').value = suggestion.display_name;
                            suggestionsBox.style.display = 'none'; // Cacher les suggestions
                            
                            // Appeler la fonction pour gérer la sélection de la ville
                            handleCitySelection(suggestion);
                        });
                        suggestionsBox.appendChild(item);
                    });
                } else {
                    suggestionsBox.style.display = 'none'; // Cacher si aucune suggestion
                }
            } else {
                console.error(`Erreur avec l’API : ${xhr.status}`);
            }
        }
    };
    xhr.send();
}

function handleCitySelection(suggestion) {
    const lat = suggestion.lat;
    const lon = suggestion.lon;
    console.log("Latitude : " + lat + ", Longitude : " + lon);
}
