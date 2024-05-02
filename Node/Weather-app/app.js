const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  const city = 'Delhi'; // Example city
  const apiKey = '8c418a5beadf0f01ac9804932328beff'; // Replace with your OpenWeatherMap API key
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Make an HTTP GET request to the weather API
  http.get(url, (response) => {
    let data = '';

    // Concatenate chunks of data as they arrive
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Process the complete response
    response.on('end', () => {
      try {
        const weatherData = JSON.parse(data);
        res.render('index', { weatherData });
      } catch (error) {
        console.error('Error parsing weather data:', error.message);
        res.render('error', { message: 'Error parsing weather data' });
      }
    });
  }).on('error', (error) => {
    console.error('Error fetching weather data:', error.message);
    res.render('error', { message: 'Error fetching weather data' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
