const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  chef: {
    type: String,
    default: "Anonym"
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [String]
});

module.exports = mongoose.model("recipe", recipeSchema);
