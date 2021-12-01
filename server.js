const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");

const MONGODB_URI =
  "mongodb+srv://deydevteam:finalproject@cluster0.bhhad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connect to the mongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database connected...");
});

//imageはmongoDBにはURLだけを格納して、frontend側？でblobに変換する。
//frontend側がapplication jsonだからここでjsonフォーマットに変換しないといけない。
app.use(express.json());
//set cors to prevent CORS error
app.use(cors());

const postsRoutes = require("./routes/posts");

app.get("/", (req, res) => {
  console.log("Requested home page");
  res.send("Home page");
});

app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT} `));
