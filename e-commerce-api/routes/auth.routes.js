const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Register API
router.post('/register', async (req, res) => {
  try {
    console.log("req!",req);
    
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

module.exports = router;
