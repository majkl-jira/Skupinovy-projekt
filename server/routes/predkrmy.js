const express = require('express');
const router = express.Router();
const Recipe = require('../controllers/recipes');  // nový controller pro recepty

// Bez autentizace, všechny CRUD operace dostupné
router.get('/', Recipe.getAllRecipes);
router.get('/:id', Recipe.getRecipeById);

router.post('/', Recipe.createRecipe);
router.put('/:id', Recipe.updateRecipe);
router.delete('/:id', Recipe.deleteRecipe);

module.exports = router;
