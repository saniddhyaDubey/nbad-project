const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_secretKey = "nbad-end-sem-project";

//TODO: Connect the database query!

const app = express();
const PORT = 3000;

app.use(cors());

const jsonParser = bodyParser.json();

app.get("/health-check", (req, res) => {
  res.send({ status: "working!" });
});

app.post("/login", jsonParser, (req, res) => {
  const { username, password } = req.body;
  // match the credentials with database fetched query!
  const user_token = jwt.sign({ username }, jwt_secretKey, { expiresIn: "1h" });

  res.json({
    status: 200,
    token: user_token,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
