const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cron = require("node-cron");

const PORT = process.env.PORT || 5000;
const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/stocks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const stockDataSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const StockData = mongoose.model("StockData", stockDataSchema);

// Dummy API URL (replace with actual API endpoint)
const API_URL = "https://api.example.com/stocks";

const fetchDataAndSaveToDB = async () => {
  try {
    const response = await axios.get(API_URL);
    const { data } = response;

    await StockData.create({
      symbol: data.symbol,
      price: data.price,
    });

    console.log("fetchDataAndSaveToDB | Data saved to Db :", data);
  } catch (error) {
    console.error("fetchDataAndSaveToDB | Error fetching data:", error.message);
  }
};

// Job run every 30 seconds
cron.schedule("*/30 * * * * *", () => {
  fetchDataAndSaveToDB();
});

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello....." });
});

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/a") {
      return nextApp.render(req, res, "/b", query);
    }

    return handle(req, res);
  });

  createServer(app).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
