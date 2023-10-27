const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const searchRoutes = require('./routes/search');

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
app.use('/api/search', searchRoutes);

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

// Cross-origin resource sharing
const corsOptions = {
  origin: '*', // This allows any domain in development. Be more restrictive in production!
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

app.use(cors(corsOptions));

// Delete endpoint for Deleting Account
app.delete('/delete', async (req, res) => {
  const { username } = req.body;
  try {
      // Assuming you're using Mongoose for database operations:
      await User.findOneAndDelete({ username: username });
      res.status(200).send('User deleted successfully');
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send('Server error');
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  try {
    const results = await User.find({
      username: new RegExp(query, 'i') // 'i' makes it case insensitive
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
