const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/shopping-app'; // Replace with your MongoDB URI
const COLLECTION_NAME = 'product'; // Replace with your collection name
const FIELD_NAME = 'name'; // Replace with the field you want to sort by

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    // Define route to fetch and sort data
    app.get('/products', async (req, res) => {
      try {
        // Retrieve all documents and sort in ascending order by field
        const products = await collection.find().sort({ [FIELD_NAME]: 1 }).toArray();
        res.json(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
