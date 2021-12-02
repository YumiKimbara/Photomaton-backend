const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/posts");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("API Is Running");
});

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.use("/api/post", postsRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
