const express = require("express");
const cors = require("cors");

const router = require("./src/routes");

const { json, urlencoded } = express;

const app = express();

const port = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
