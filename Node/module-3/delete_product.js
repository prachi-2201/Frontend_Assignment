const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/shopping-app'; // Replace with your MongoDB URI
const COLLECTION_NAME = 'product'; // Replace with your collection name

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    // Delete a product
    app.delete('/products/:id', async (req, res) => {
      const productId = req.params.id;

      try {
        // Delete the product with the given ID
        const result = await collection.deleteOne({ _id:new ObjectId(productId) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (err) {
        console.error('Error deleting product:', err);
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
