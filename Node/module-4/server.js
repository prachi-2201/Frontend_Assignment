const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db('task_manager');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.collection('tasks').find().toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  };

  try {
    const result = await db.collection('tasks').insertOne(task);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await db
      .collection('tasks')
      .findOne({ _id: new ObjectID(req.params.id) });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };

  try {
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: updates }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated' });
} catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const updates = {};
  if (req.body.title) {
    updates.title = req.body.title;
  }
  if (req.body.description) {
    updates.description = req.body.description;
  }
  if (req.body.completed !== undefined) {
    updates.completed = req.body.completed;
  }

  try {
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: updates }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await db.collection('tasks').deleteOne({
      _id: new ObjectID(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
