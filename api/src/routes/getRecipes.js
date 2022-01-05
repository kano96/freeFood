const router = require("express").Router();
const { recipes } = require("../db");

router.get("/getRecipes", (req, res) => {
  res.json(recipes);
});

module.exports = router;
