const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const jsonParser = bodyParser.json();

app.get("/health-check", (req, res) => {
  res.send({ status: "working!" });
});

app.post("/login", jsonParser, (req, res) => {
  const { username, password } = req.body;
  // got the user credentials - implement database verification & jwt token!
  res.status(200).send("redirect to dashboard page!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
