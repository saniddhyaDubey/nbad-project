const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_secretKey = "nbad-end-sem-project";

//TODO: Connect the database query!
const mongoDbURI = "LOCALHOST_MONGODB_CONNECTION_STRING";

const app = express();
const PORT = 3000;

//Models used in the project {User, SummaryCharts, ReportsCharts}:
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const SummarySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  capacityGW: {
    type: Number,
    required: true,
  },
});
const Summary = mongoose.model("Summary", SummarySchema);

const ReportsSchema = new mongoose.Schema({
  innovationArea: {
    type: String,
    required: true,
  },
  focusPercentage: {
    type: Number,
    required: true,
  },
});
const Reports = mongoose.model("Reports", ReportsSchema);

mongoose
  .connect(mongoDbURI)
  .then(() => console.log("Connected to database!"))
  .catch((e) => console.log("Error conencting to database:", e));

app.use(cors());

const jsonParser = bodyParser.json();

app.get("/api/health-check", async (req, res) => {
  res.send({ status: "working!" });
});

app.get("/api/setup", async (req, res) => {
  try {
    // Collections Pre-filled data!
    const username = "saniddhya";
    const password = "saniddhya";
    const globalWindCapacityGrowth = [
      { year: 2015, capacityGW: 435 },
      { year: 2017, capacityGW: 539 },
      { year: 2019, capacityGW: 651 },
      { year: 2021, capacityGW: 743 },
      { year: 2023, capacityGW: 837 },
      { year: 2025, capacityGW: 950 },
    ];
    const windEnergyInnovationBreakdown = [
      { innovationArea: "Floating Offshore Wind", focusPercentage: 30 },
      { innovationArea: "Advanced Turbine Designs", focusPercentage: 25 },
      { innovationArea: "Energy Storage Solutions", focusPercentage: 20 },
      {
        innovationArea: "AI-based Predictive Maintenance",
        focusPercentage: 15,
      },
      {
        innovationArea: "Wake Steering & Farm-Level Optimization",
        focusPercentage: 10,
      },
    ];

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    await Summary.insertMany(globalWindCapacityGrowth);
    await Reports.insertMany(windEnergyInnovationBreakdown);

    return res.status(201).json({
      status: 201,
      message: "Initial setup done successfully!",
    });
  } catch (error) {
    console.error("Error setting up user:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

app.post("/api/login", jsonParser, async (req, res) => {
  const { username, password } = req.body;
  if (username != "saniddhya") {
    return res.json({
      status: 401,
      token: null,
    });
  }
  const userData = await User.findOne({ username });
  const hashedUserPassword = await bcrypt.compare(password, userData.password);
  if (!hashedUserPassword) {
    return res.json({
      status: 401,
      token: null,
    });
  }

  const user_token = jwt.sign({ username }, jwt_secretKey, {
    expiresIn: "3m",
  });

  return res.json({
    status: 200,
    token: user_token,
  });
});

app.get("/api/summary", async (req, res) => {
  const summaryData = await Summary.find({});
  return res.status(200).json(summaryData);
});

app.get("/api/reports", async (req, res) => {
  const reportsData = await Reports.find({});
  return res.status(200).json(reportsData);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
