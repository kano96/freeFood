const router = require("express").Router();
const { getFood } = require("../controllers/food.controller");

router.get("/getFood", getFood);

module.exports = router;
