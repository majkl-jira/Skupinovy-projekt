const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  content: { 
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ["hlavni-chody", "dezerty", "predkrmy", "polevky", "napoje"],
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model("Recipe", recipeSchema); 
