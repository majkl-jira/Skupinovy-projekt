const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ date: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Chyba při načítání receptů:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recept nenalezen' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Chyba při načítání receptu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { name, description, instructions, image, chef, tags } = req.body;

    const newRecipe = new Recipe({
      name,
      description,
      instructions,
      image,
      chef: chef || 'Anonym',
      tags: tags || []
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recept byl úspěšně vytvořen', recipe: newRecipe });
  } catch (error) {
    console.error('Chyba při vytváření receptu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { name, description, instructions, image, tags, chef } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recept nenalezen' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, description, instructions, image, tags, chef },
      { new: true }
    );

    res.status(200).json({ message: 'Recept byl úspěšně aktualizován', recipe: updatedRecipe });
  } catch (error) {
    console.error('Chyba při aktualizaci receptu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recept nenalezen' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Recept byl úspěšně smazán' });
  } catch (error) {
    console.error('Chyba při mazání receptu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};
