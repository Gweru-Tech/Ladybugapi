const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({
        error: 'Missing city parameter',
        message: 'Please provide a city name using ?city=city_name'
      });
    }

    // Using free weather API (wttr.in)
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    const data = response.data;

    const currentCondition = data.current_condition[0];
    const weather = data.weather[0];

    res.json({
      success: true,
      location: {
        city: city,
        region: data.nearest_area[0].region[0].value,
        country: data.nearest_area[0].country[0].value
      },
      current: {
        temperature: currentCondition.temp_C + '°C',
        temperatureF: currentCondition.temp_F + '°F',
        feelsLike: currentCondition.FeelsLikeC + '°C',
        humidity: currentCondition.humidity + '%',
        windSpeed: currentCondition.windspeedKmph + ' km/h',
        windDirection: currentCondition.winddir16Point,
        pressure: currentCondition.pressure + ' mb',
        visibility: currentCondition.visibility + ' km',
        uvIndex: currentCondition.uvIndex,
        description: currentCondition.weatherDesc[0].value,
        icon: currentCondition.weatherIconUrl[0].value
      },
      forecast: {
        date: weather.date,
        maxTemp: weather.maxtempC + '°C',
        minTemp: weather.mintempC + '°C',
        avgTemp: weather.avgtempC + '°C',
        sunrise: weather.astronomy[0].sunrise,
        sunset: weather.astronomy[0].sunset,
        moonrise: weather.astronomy[0].moonrise,
        moonset: weather.astronomy[0].moonset
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Weather fetch failed',
      message: error.message
    });
  }
});

module.exports = router;
