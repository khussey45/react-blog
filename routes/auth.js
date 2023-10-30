const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Add a password length validation
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ username: newUser.username, id: newUser._id });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'Username already exists, choose another name' });
        } else {
            // Log the specific error message for debugging
            console.error(err.message);
            res.status(400).json({ error: 'Registration error' });
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
      
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Respond with token and user data without hashed password
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ token, message: 'Login successful', user: userWithoutPassword });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Login error' });
    }
});

// Assuming you will extract the username from the JWT in the future:
router.delete('/delete', async (req, res) => {
    const { username } = req.user;
  
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Deletion error' });
    }
});

module.exports = router;
