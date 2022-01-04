const { ingredients, recipes } = require("../db");

const numberOfRecipes = Object.keys(ingredients).length;

function validateIngredients(recipe) {
  const wanted = {};
  for (let ingredient in recipe) {
    if (recipe[ingredient] > ingredients[ingredient]) {
      wanted[ingredient] = recipe[ingredient] - ingredients[ingredient];
    }
  }
  return Object.keys(wanted).length ? wanted : true;
}

function decreaseIngredientsOnKitchen(recipe) {
  for (let ingredient in recipe) {
    ingredients[ingredient] -= recipe[ingredient];
  }
}

async function buyIngredients(ingredients) {}

function selectRecipeRandom(max) {
  return `recipe${Math.floor(Math.random() * max + 1)}`;
}

async function getFood(req, res) {
  const randomRecipe = selectRecipeRandom(numberOfRecipes);
  const recipeToDo = recipes[randomRecipe];
  const ingredientsOnKitchen = validateIngredients(recipeToDo);
  if (ingredientsOnKitchen === true) {
    decreaseIngredientsOnKitchen(recipeToDo);
    res.json({ msg: "food delivered" });
  } else {
    const ingredientsOnMarket = await buyIngredients(ingredientsOnKitchen);
  }
}

module.exports = {
  getFood,
};
