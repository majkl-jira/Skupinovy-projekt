const Recipe = require('../models/recipe');


exports.getAllRecipes = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const recipes = await Recipe.find(filter)
      .sort({ date: -1 })
      .populate("author", "name");

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Chyba při načítání receptů:", error);
    res.status(500).json({ message: "Chyba serveru" });
  }
};


exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "name");

    if (!recipe) {
      return res.status(404).json({ message: "Recept nenalezen" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Chyba při načítání receptu:", error);
    res.status(500).json({ message: "Chyba serveru" });
  }
};


exports.createRecipe = async (req, res) => {
  try {

    const { title, content, image, category, tags } = req.body;

    if (!title || !content || !image || !category) {
      return res.status(400).json({ message: "Vyplňte všechna povinná pole." });
    }

    const newRecipe = new Recipe({
      title,
      content,
      image,
      category,
      tags: Array.isArray(tags) ? tags : [],
      author: req.userId
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recept vytvořen", recipe: newRecipe });

  } catch (error) {
    console.error("🔥 SERVER ERROR:", error);
    res.status(500).json({ message: "Chyba serveru" });
  }
};




exports.updateRecipe = async (req, res) => {
  try {
    const { title, content, image, category, tags } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recept nenalezen' });
    }

    
    recipe.title = title || recipe.title;
    recipe.content = content || recipe.content;
    recipe.image = image || recipe.image;
    recipe.category = category || recipe.category;
    recipe.tags = Array.isArray(tags) ? tags : recipe.tags;

    const updatedRecipe = await recipe.save();

    res.status(200).json({
      message: 'Recept byl úspěšně aktualizován',
      recipe: updatedRecipe
    });

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
