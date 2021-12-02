const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postsRoutes = require("./routes/posts");
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
connectDB();

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


app.get('/', (req, res) => {
    res.send('API Is Running')
});

app.get("/", (req, res) => {
  console.log("Requested home page");
  res.send("Home page");

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);
app.use("/posts", postsRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})