const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

// const Post = require("");
const MONGODB_URI =
  "mongodb+srv://deydevteam:finalproject@cluster0.bhhad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// app.use(express.json());

const postsRoutes = require("./routes/posts");

app.get("/", (req, res) => {
  console.log("Requested home page");
  res.send("Home page");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT} `));
