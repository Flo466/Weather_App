export class WeatherDetail {
    constructor(iconSrc, label, value) {
        this.iconSrc = iconSrc;
        this.label = label;
        this.value = value;
    }

    create() {
        const col = document.createElement('div');
        col.classList.add('col-lg-4', 'col-md-4' ,'col-xl-2', 'col-6','mb-2');
        const card = document.createElement('div');
        card.classList.add('weather-detail-card');

        const textContainer = document.createElement('div');
        textContainer.classList.add('detail-text-container');

        const labelElem = document.createElement('p');
        labelElem.textContent = this.label;
        labelElem.classList.add('weather-detail-title');

        const valueElem = document.createElement('p');
        valueElem.textContent = this.value;
        valueElem.classList.add('weather-detail-value');

        textContainer.appendChild(labelElem);
        textContainer.appendChild(valueElem);

        const icon = document.createElement('img');
        icon.src = this.iconSrc;
        icon.alt = this.label;
        icon.classList.add('detail-icon');

        card.appendChild(textContainer);
        card.appendChild(icon);
        col.appendChild(card);

        return col;
    }
}
