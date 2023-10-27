// /routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const query = req.query.query;
  try {
    const results = await User.find({ username: new RegExp(query, 'i') });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
