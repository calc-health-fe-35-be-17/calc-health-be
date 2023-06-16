const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares/middlewares');
const { User } = require('../models');

// Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user by ID
router.delete('/:id',  async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/user/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, email, password, gender, berat, tinggi, umur, isAdmin } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user
    user.nama = nama;
    user.email = email;
    user.password = password;
    user.gender = gender;
    user.berat = berat;
    user.tinggi = tinggi;
    user.umur = umur;

    // Save the changes to the database
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
