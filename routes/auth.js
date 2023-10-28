// ./routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

   const newUser = new User({ username, password: hashedPassword });

   try {
    await newUser.save();
    // Might want to avoid sending the entire user object with the hashed password.
    // Instead, you can send specific fields or omit the password
    res.status(201).json({ username: newUser.username, id: newUser._id });
  } catch (err) {
    // Check if the error is due to a duplicate key
    if (err.code === 11000) {
      res.status(400).json({ error: 'Username already exists, choose another name' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    
    res.json({ message: 'Login successful', user });  // Respond with success message and user data
  } catch (err) {
    res.status(500).json({ error: err.message });  // Respond with server error
  }
});

router.delete('/delete', async (req, res) => {
  const { username } = req.body; // or fetch username from session or JWT token if you're using that
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
