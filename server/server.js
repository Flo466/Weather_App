import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Charger les variables d'environnement

const app = express();
const port = 3000;

app.get('/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&include=days,hours,current&key=${apiKey}&contentType=json`;
        const response = await axios.get(url);
        res.json(response.data);  // Transmettre les données au frontend
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
