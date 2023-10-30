const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const searchRoutes = require('./routes/search');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there's no token, reject the request

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // if the token is invalid or expired
      req.user = user;
      next();
  });
}


// Load environment variables from .env file
require('dotenv').config();

// check for environment variables
if (!process.env.JWT_SECRET_KEY || !process.env.MONGODB_URI) {
  console.error("Essential environment variables are missing!");
  process.exit(1); // Exit the process with an error code
}


// Access the MongoDB connection string
const mongoURI = process.env.MONGODB_URI;
// console.log(process.env.MONGODB_URI);


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const app = express();

// Middleware
const allowedOrigins = ['https://localhost:3000', 'https://localhost:5000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy...';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Authorization', 'Content-Type'],
  optionsSuccessStatus: 204
};

// app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/search', searchRoutes);

// This is for express-session even tho it has JWT??
// app.use(session({
//   secret: process.env.JWT_SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));


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

app.get('/user/:username', authenticateToken, async (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).send("Not authenticated");
}

  // Check if the authenticated user matches the user data being requested
  if (req.user.username !== req.params.username) {
    return res.status(403).send("Not authorized");
}


  try {
      const user = await User.findOne({ username: req.params.username });
      if (user) {
          res.json(user);
      } else {
          res.status(404).send('User not found');
      }
  } catch (err) {
      res.status(500).json({ error: "Server error" });
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



// Delete endpoint for Deleting Account
app.delete('/delete/:username', authenticateToken, async (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
      return res.status(401).send("Not authenticated");
  }
  const username = req.params.username;

  // Check if the authenticated user matches the user being deleted
  if (req.user.username !== username) {
    return res.status(403).send("Not authorized to delete this user");
}

  try {
      await User.findOneAndDelete({ username: username });
      res.status(200).send('User deleted successfully');
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send('Server error');
  }
});


// app.get('/api/search', async (req, res) => {
//   const query = req.query.query;
//   try {
//     const results = await User.find({
//       username: new RegExp(query, 'i') // 'i' makes it case insensitive
//     });
//     res.json(results);
//   } catch (error) {
//     console.error("Error searching users:", error);
//     res.status(500).send('Server error');
//   }
// });

app.post('/logout', (req, res) => {
  // With JWTs, there's not much you can do server-side to log out. Instead, you'd clear the token client-side.
  // You can send a response indicating the client should clear the token.
  return res.status(200).send("Logged out");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
