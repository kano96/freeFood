const router = require("express").Router();
const getFood = require("./getFood");
const getIngredients = require("./getIngredientsOnKitchen");
const getRecipes = require("./getRecipes");

router.use(getFood);
router.use(getIngredients);
router.use(getRecipes);

module.exports = router;
