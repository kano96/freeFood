const router = require("express").Router();
const getFood = require("./getFood");

router.use(getFood);

module.exports = router;
