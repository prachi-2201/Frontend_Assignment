const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/shopping-app'; // Replace with your MongoDB URI
const COLLECTION_NAME = 'product'; // Replace with your collection name

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    // Update product price
    app.put('/products/:id', async (req, res) => {
      const productId = req.params.id;
      const newPrice = req.body.price;

      try {
        // Update the product with the given ID
        const result = await collection.updateOne(
          { _id:new ObjectID(productId) },
          { $set: { price: newPrice } }
        );


        res.status(200).json({ message: 'Product price updated successfully' });
      } catch (err) {
        console.error('Error updating product price:', err);
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
