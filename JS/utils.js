// Fonction debounce
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fonction d'initialisation de l'autocomplétion
export function initAutocomplete(inputElementId, suggestionsBoxId, getCitySuggestions) {
    const input = document.getElementById(inputElementId);
    const suggestionsBox = document.getElementById(suggestionsBoxId);

    if (!input) {
        console.error(`L'élément ${inputElementId} n'existe pas dans le DOM !`);
        return;
    }

    // Utiliser debounce pour limiter les appels à getCitySuggestions
    input.addEventListener('input', debounce(function () {
        const query = input.value.trim();
        console.log(`Recherche : ${query}`);
        if (query.length > 2) { // Lancer la recherche uniquement si la longueur est > 2
            getCitySuggestions(query); // Appeler la fonction AJAX pour récupérer les suggestions
        } else {
            suggestionsBox.style.display = 'none'; // Cacher les suggestions si la requête est trop courte
        }
    }, 300)); // 300ms de délai avant d'exécuter

    // Fermer les suggestions lorsqu'on clique en dehors
    document.addEventListener('click', (e) => {
        if (suggestionsBox && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });
}
