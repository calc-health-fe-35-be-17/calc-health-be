const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import the User model

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey123');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password, gender, berat, tinggi, umur, isAdmin } = req.body;

    // Create a new user
    const user = await User.create({ nama, email, password, gender, berat, tinggi, umur, isAdmin });

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
