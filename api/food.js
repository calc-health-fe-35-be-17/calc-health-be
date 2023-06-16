// routes/food.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Food} = require('../models/');
const upload = require('../middlewares/upload');
const path = require ('path');

// GET /api/food
router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/food/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/food
router.post('/', upload.single('picture'), async (req, res) => {
        const { name, calorie, carbon } = req.body;
        const picture = req.file;
      
        try {
          // Check if a picture was uploaded
          if (!picture) {
            res.status(400).json({ error: 'No picture uploaded' });
            return;
          }
      
          // Create the food item in the database
          const food = await Food.create({ name, calorie, carbon, picture: picture.filenamem, description });
          res.status(201).json(food);
        }  catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: 'Internal server error' });
          }
      });

// DELETE /api/food/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Food.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
