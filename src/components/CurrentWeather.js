export class CurrentWeather {
    constructor(location, icon, temperature, condition) {
        this.location = location;
        this.icon = icon;
        this.temperature = temperature;
        this.condition = condition;
    }

    create() {
        const container = document.createElement('div');
        container.classList.add('current-weather');

        // Emplacement
        const locationElem = document.createElement('h1');
        locationElem.textContent = this.location;
        locationElem.classList.add('current-location');

        // Icône météo
        const iconElem = document.createElement('img');
        iconElem.src = this.icon;
        iconElem.alt = this.condition;
        iconElem.classList.add('current-icon');

        // Température
        const tempElem = document.createElement('p');
        tempElem.textContent = `${this.temperature}°C`;
        tempElem.classList.add('current-temperature');

        // Condition météo
        const conditionElem = document.createElement('p');
        conditionElem.textContent = this.condition;
        conditionElem.classList.add('current-condition');

        // Ajouter les éléments au conteneur
        container.appendChild(locationElem);
        container.appendChild(iconElem);
        container.appendChild(tempElem);
        container.appendChild(conditionElem);

        return container;
    }
}
