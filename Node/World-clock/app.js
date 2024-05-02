const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
