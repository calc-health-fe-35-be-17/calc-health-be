// routes/cartFood.js
const express = require('express');
const router = express.Router();
const {CartFood} = require('../models/');
const {Food}= require('../models/');

// GET /api/cartFood/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cartFoods = await CartFood.findAll({ where: { user_id: userId } });
    const foodIds = cartFoods.map((cartFood) => cartFood.food_id);
    const foods = await Food.findAll({ where: { id: foodIds } });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/cartFood
router.post('/', async (req, res) => {
    const { userId, foodId } = req.body;
    try {
      // Find the food based on the foodId
      const food = await Food.findByPk(foodId);
      if (!food) {
        return res.status(404).json({ error: 'Food not found' });
      }
  
      // Create the cartFood entry
      const cartFood = await CartFood.create({ user_id: userId, food_id: foodId });
  
      // Prepare the response with the food's picture and name
      const response = {
        id: cartFood.id,
        user_id: cartFood.user_id,
        food_id: cartFood.food_id,
        food: {
          id: food.id,
          name: food.name,
          picture: food.picture
        }
      };
  
      res.status(201).json(response);
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// DELETE /api/cartFood/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await CartFood.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
