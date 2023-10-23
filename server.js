const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');


// Load environment variables from .env file
require('dotenv').config();

// Access the MongoDB connection string
const mongoURI = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Ensure to set this to false if you're working locally without HTTPS
}));
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// In your server.js file or wherever you handle routes
app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).send(err.message);
  }
});
app.get('/user/:username', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username });
      if (user) {
          res.json(user);
      } else {
          res.status(404).send('User not found');
      }
  } catch (err) {
      res.status(500).send(err.message);
  }
});
app.get('/recent-users', async (req, res) => {
  try {
      const recentUsers = await User.find({ createdAt: { $gte: new Date('2023-01-01') } });
      res.json(recentUsers);
  } catch (err) {
      res.status(500).send(err.message);
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
