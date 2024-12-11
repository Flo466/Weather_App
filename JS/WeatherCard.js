class WeatherCard {
  constructor(date, icon, temperature) {
      this.date = date;
      this.icon = icon;
      this.temperature = temperature;
  }

  create() {
      const card = document.createElement('div');
      card.classList.add('weather-card');

      const date = document.createElement('p');
      date.classList.add('date');
      date.textContent = this.date;

      const image = document.createElement('img');
      image.src = this.icon;
      image.alt = 'Icône météo';
      image.classList.add('weather-icon');

      const temp = document.createElement('p');
      temp.classList.add('temperature');
      temp.textContent = `${this.temperature}°C`;

      card.appendChild(date);
      card.appendChild(image);
      card.appendChild(temp);

      return card;
  }
}

export default WeatherCard;
