class DailyWeather {
    constructor(place, date, icon, temperature) {
        this.place = place;
        this.date = date;
        this.icon = icon;
        this.temperature = temperature;
    }

    create() {
        const daily = document.createElement('div');
        daily.classList.add('daily');

        const place = document.createElement('p');
        place.classList.add('place');
        place.textContent = this.place;

        const date = document.createElement('p');
        date.classList.add('date');
        date.textContent = this.date;

        const image = document.createElement('img');
        image.src = this.icon;
        image.alt = 'Icône météo';
        image.classList.add('daily-icon');

        const temp = document.createElement('p');
        temp.classList.add('temperature');
        temp.textContent = `${this.temperature}°C`;

        daily.appendChild(place);
        daily.appendChild(date);
        daily.appendChild(image);
        daily.appendChild(temp);

        return daily;
    }
}

export default DailyWeather;
