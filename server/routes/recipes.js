const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe'); // tvoje mongoose schema receptu

// Příklad GET všech receptů
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recept nenalezen' });
      }
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  });
  

// Příklad POST nového receptu
router.post('/', async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
