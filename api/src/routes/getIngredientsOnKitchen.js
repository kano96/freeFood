const router = require("express").Router();
const getIngredients = require("../controllers/ingredients.controller");

router.get("/getIngredients", getIngredients);

module.exports = router;
