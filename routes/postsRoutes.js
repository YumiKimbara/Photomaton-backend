const express = require("express");

const postsController = require("../controllers/postsController");

const router = express.Router();

router.post("/", postsController.postNewPost);
router.get("/", postsController.getAllPosts);

module.exports = router;
