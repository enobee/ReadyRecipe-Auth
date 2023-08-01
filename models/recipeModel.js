const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    user_id: { type: String, required: true,},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
