class WeatherCard {
    constructor(date, icon, temperature) {
      // Propriétés de l'instance
      this.date = date;
      this.icon = icon;
      this.temperature = temperature;
    }
  
    // Méthode pour créer le composant
    create() {
      // Créer un div pour la carte météo
      const card = document.createElement('div');
      card.classList.add('weather-card'); // Ajoute une classe pour le style

      // Date
      const date = document.createElement('p');
      date.classList.add('date');
      date.textContent = `${this.date}`;
  
      // Créer l'élément image pour l'icône
      const image = document.createElement('img');
      image.src = this.icon; 
      image.alt = 'Icône météo';
      image.classList.add('weather-icon');
  
      // Créer un paragraphe pour afficher la température
      const temp = document.createElement('p');
      temp.classList.add('temperature');
      temp.textContent = `${this.temperature}°C`;
  
      // Ajouter l'image et la température à la carte
      card.appendChild(date);
      card.appendChild(image);
      card.appendChild(temp);
  
      return card; // Retourne l'élément complet
    }
  }

  // Création de nouvelles cartes météo
const card1 = new WeatherCard("15/01" ,'/asset/sun.png', 25);
const card2 = new WeatherCard("16/01", '/asset/cloud.png', 18);
const card3 = new WeatherCard("17/01", '/asset/sun.png', 22);
const card4 = new WeatherCard("18/01", '/asset/variable.png', 22);
const card5 = new WeatherCard("19/01", '/asset/sun.png', 22);
const card6 = new WeatherCard("20/01", '/asset/storm.png', 22);
const card7 = new WeatherCard("21/01", '/asset/variable.png', 22);

// Ajouter les cartes au body de la page
document.body.appendChild(card1.create());
document.body.appendChild(card2.create());
document.body.appendChild(card3.create());
document.body.appendChild(card4.create());
document.body.appendChild(card5.create());
document.body.appendChild(card6.create());
document.body.appendChild(card7.create());

