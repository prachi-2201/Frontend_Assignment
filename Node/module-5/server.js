const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/crud_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/user');

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

// Routes
// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  try {
    const newUser = await user.save();
    const token = jwt.sign({ userId: newUser._id }, 'secret-key');
    req.session.token = token;
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    req.session.token = token;
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Logout from all devices
app.get('/logout-all', async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: 'Logged out from all devices successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your profile' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
