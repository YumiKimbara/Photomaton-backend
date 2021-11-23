const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");
// const Post = require("");
// const MONGODB_URI = "";

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Requested home page");
  res.send("Home page");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT} `));
