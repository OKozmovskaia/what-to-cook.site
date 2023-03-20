const mongoose = require("mongoose");
const connection = require("../database");

const recipeSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
  },
  cuisineType: [
    {
      type: String,
    },
  ],
  mealType: [
    {
      type: String,
    },
  ],
  dishType: [
    {
      type: String,
    },
  ],
  ingredientLines: [
    {
      type: String,
    },
  ],
});

const Recipe = connection.model("recipe", recipeSchema);
module.exports = Recipe;
