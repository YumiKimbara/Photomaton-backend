const express = require("express");

const postsController = require("../controllers/posts");

const router = express.Router();

router.post("/posts", postsController.postPost);
