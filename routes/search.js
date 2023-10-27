// /routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

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



module.exports = router;
