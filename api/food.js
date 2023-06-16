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
        const { name, calorie, carbon, carbohydrates, protein, fat, description } = req.body;
        const picture = req.file;
      
        try {
          // Check if a picture was uploaded
          if (!picture) {
            res.status(400).json({ error: 'No picture uploaded' });
            return;
          }
      
          // Create the food item in the database
          const food = await Food.create({ name, calorie, carbon, carbohydrates, protein, fat, picture: picture.filename, description });
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

// PUT /api/food/:id
router.put('/:id', upload.single('picture'), async (req, res) => {
  const { id } = req.params;
  const { name, calorie, carbon, carbohydrates, protein, fat, description } = req.body;
  const picture = req.file;

  try {
    // Check if the food item exists
    const food = await Food.findByPk(id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
      return;
    }

    // Update the food item
    food.name = name;
    food.calorie = calorie;
    food.carbon = carbon;
    food.carbohydrates = carbohydrates;
    food.protein = protein;
    food.fat = fat;
    food.description = description;

    // Check if a new picture was uploaded
    if (picture) {
      food.picture = picture.filename;
    }

    // Save the changes to the database
    await food.save();

    res.json(food);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
