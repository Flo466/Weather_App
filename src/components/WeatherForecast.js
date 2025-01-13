import { getIconPath, getDayNameFromDateString } from "../utils/utils.js";

export class WeatherForecast {
    constructor(data, type) {
        this.data = data;
        this.type = type; // "hourly" or "daily"
    }

    create() {
        const col = document.createElement('div');
        col.classList.add('col-lg-6', 'col-12', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('forecast-card');

        const title = document.createElement('h2');
        title.textContent = this.type === 'hourly' ? 'Heure par heure' : 'Prochains jours';
        card.appendChild(title);

        const container = document.createElement('div');
        container.classList.add(this.type === 'hourly' ? 'hourly-container' : 'daily-container');

        this.data.forEach(item => {
            const itemElem = document.createElement('div');
            itemElem.classList.add('forecast-item');

            const iconElem = document.createElement('img');
            iconElem.classList.add('weather-icon');
            iconElem.src = getIconPath(item.icon);
            iconElem.alt = item.datetime || item.datetime;

            const timeOrDayElem = document.createElement('p');
            timeOrDayElem.textContent = this.type === 
            'hourly' ? item.datetime.substring(0, 5) : getDayNameFromDateString(item.datetime);

            const tempElem = document.createElement('p');
            tempElem.textContent = `${Math.round(item.temp)}°C`;

            itemElem.appendChild(iconElem);
            itemElem.appendChild(timeOrDayElem);
            itemElem.appendChild(tempElem);

            container.appendChild(itemElem);
        });

        card.appendChild(container);
        col.appendChild(card);
        return col;
    }
}
