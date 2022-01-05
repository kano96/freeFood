const { ingredients } = require("../db");

function getIngredients(req, res) {
  res.json(ingredients);
}

module.exports = getIngredients;
