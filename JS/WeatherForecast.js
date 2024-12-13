export class WeatherForecast {
    constructor(data, type) {
        this.data = data;
        this.type = type; // "hourly" ou "daily"
    }

    // Méthode pour créer la carte météo
    create() {
        const card = document.createElement('div');
        card.classList.add('forecast-card'); // Classe générique pour la carte

        // Ajouter le titre
        const title = document.createElement('h2');
        title.textContent = this.type === 'hourly' ? 'Heure par heure' : 'Prochains jours';
        title.style.textAlign = 'center'; // Optionnel : centrer le texte
        card.appendChild(title);

        // Conteneur pour les données
        const container = document.createElement('div');
        container.classList.add(this.type === 'hourly' ? 'hourly-container' : 'daily-container');

        this.data.forEach(item => {
            const itemElem = document.createElement('div');
            itemElem.classList.add('forecast-item');

            // Icône
            const iconElem = document.createElement('img');
            iconElem.classList.add('weather-icon');
            iconElem.src = item.icon;
            iconElem.alt = item.label || item.name;

            // Heure ou Jour
            const timeOrDayElem = document.createElement('p');
            timeOrDayElem.textContent = this.type === 'hourly' ? item.label : item.name;

            // Température
            const tempElem = document.createElement('p');
            tempElem.textContent = `${item.temperature}°C`;

            // Ajouter les éléments au bloc
            itemElem.appendChild(iconElem);
            itemElem.appendChild(timeOrDayElem);
            itemElem.appendChild(tempElem);

            container.appendChild(itemElem);
        });

        card.appendChild(container);
        return card;
    }
}
