const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const ytsearchRoute = require('./routes/ytsearch');
const chatgptRoute = require('./routes/chatgpt');
const ytmp3Route = require('./routes/ytmp3');
const ytmp4Route = require('./routes/ytmp4');
const weatherRoute = require('./routes/weather');

app.use('/api/ytsearch', ytsearchRoute);
app.use('/api/chatgpt', chatgptRoute);
app.use('/api/ytmp3', ytmp3Route);
app.use('/api/ytmp4', ytmp4Route);
app.use('/api/weather', weatherRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ntando Mods API',
    version: '1.0.0',
    endpoints: {
      ytsearch: '/api/ytsearch?q=search_query',
      chatgpt: '/api/chatgpt (POST with {message: "your message"})',
      ytmp3: '/api/ytmp3?url=youtube_url',
      ytmp4: '/api/ytmp4?url=youtube_url',
      weather: '/api/weather?city=city_name'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Ntando Mods API running on port ${PORT}`);
});
