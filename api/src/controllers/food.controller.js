const { ingredients, recipes } = require("../db");

const numberOfRecipes = Object.keys(ingredients).length;

//look if there are enough ingredients for recipe
function validateIngredients(recipe) {
  const wanted = {};
  for (let ingredient in recipe) {
    if (recipe[ingredient] > ingredients[ingredient]) {
      wanted[ingredient] = recipe[ingredient] - ingredients[ingredient];
    }
  }
  return Object.keys(wanted).length ? wanted : true;
}

//decrease ingredients on kitchen  when recipe is done
function decreaseIngredientsOnKitchen(recipe) {
  for (let ingredient in recipe) {
    ingredients[ingredient] -= recipe[ingredient];
  }
}

//buy enough ingredients in order to do the recipe
async function buyIngredients(ingredientsNeeded) {
  const ingredientsToBuy = Object.keys(ingredientsNeeded);
  let ingredientsCheckList = {};
  for (let ingredient of ingredientsToBuy) {
    ingredientsCheckList[ingredient] = false;
  }
  let notEnoughIngredients = true;
  let error = false;

  while (notEnoughIngredients) {
    for (let ingredient of ingredientsToBuy) {
      fetch(
        `https://recruitment.alegra.com/api/farmers-market/buy/?ingredient=${ingredient}`
      )
        .then((response) => response.json())
        .then((data) => (ingredients[ingredient] += data.quantitySold))
        .catch((e) => (error = true));
      if (ingredients[ingredient] >= ingredientsNeeded[ingredient]) {
        ingredientsCheckList[ingredient] = true;
      }
    }
    if (Object.values(ingredientsCheckList).every((el) => el === true)) {
      notEnoughIngredients = false;
    }
  }
  return error ? "Market closed" : true;
}

//generate random number for recipe
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
    if (ingredientsOnMarket === true) {
      decreaseIngredientsOnKitchen(recipeToDo);
      res.json({ msg: "food delivered" });
    } else {
      res.json({ msg: "market closed" });
    }
  }
}

module.exports = {
  getFood,
};
