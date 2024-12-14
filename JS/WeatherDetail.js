export class WeatherDetail {
    constructor(iconSrc, label, value) {
        this.iconSrc = iconSrc;
        this.label = label;
        this.value = value;
    }

    create() {
        const col = document.createElement('div');
        col.classList.add('col-lg-4', 'col-6', 'mb-4'); // Classes Bootstrap pour la mise en page

        const card = document.createElement('div');
        card.classList.add('card', 'weather-detail-card'); // Classe personnalisée pour la carte météo

        // Conteneur pour le texte (au-dessus de l'image)
        const textContainer = document.createElement('div');
        textContainer.classList.add('detail-text-container'); // Classe pour le texte

        // Label du détail (en haut)
        const labelElem = document.createElement('p');
        labelElem.textContent = this.label;
        labelElem.classList.add('weather-detail-title');

        // Valeur du détail
        const valueElem = document.createElement('p');
        valueElem.textContent = this.value;
        valueElem.classList.add('weather-detail-value');

        textContainer.appendChild(labelElem);
        textContainer.appendChild(valueElem);

        // Image (icône)
        const icon = document.createElement('img');
        icon.src = this.iconSrc;
        icon.alt = this.label;
        icon.classList.add('detail-icon');

        // Ajouter le texte et l'image au conteneur principal
        card.appendChild(textContainer);
        card.appendChild(icon);

        // Ajouter la carte à la colonne
        col.appendChild(card);

        return col;
    }
}
