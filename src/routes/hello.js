const router = require("express").Router();

router.get("/", (req, res) => {
  msg = `Hello ${req.query.name || "World"} from get request`;
  res.json({ msg });
});

module.exports = router;
