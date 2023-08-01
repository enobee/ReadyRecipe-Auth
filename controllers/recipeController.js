const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// get all recipes
const getRecipes = async (req, res) => {
  const user_id = req.user._id;
  const recipe = await Recipe.find({user_id}).sort({ createdAt: -1 });

  res.status(200).json(recipe);
};

// get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// create a new recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, instructions, cookingTime } = req.body;
  console.log(req.body);

   let emptyFields = [];

   if (!name) {
     emptyFields.push("name");
   }
   if (!ingredients) {
     emptyFields.push("ingredients");
   }
   if (!instructions) {
     emptyFields.push("instructions");
   }

   if (!cookingTime) {
     emptyFields.push("cookingTime");
   }
   if (emptyFields.length > 0) {
     return res
       .status(400)
       .json({ error: "Please fill in all fields", emptyFields });
   }

  // add to the database
  try {
    
    const user_id = req.user._id;
    const recipe = await Recipe.create({ name, ingredients, instructions, cookingTime, user_id });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such recipe" });
    }

    const recipe = await Recipe.findOneAndDelete({ _id: id });

    if (!recipe) {
      return res.status(400).json({ error: "No such recipe" });
    }

    res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such recipe" });
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!recipe) {
      return res.status(400).json({ error: "No such recipe" });
    }

    res.status(200).json(recipe);
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
