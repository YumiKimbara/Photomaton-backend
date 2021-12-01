const express = require("express");
const multer = require("multer");
const upload = multer();

const postsController = require("../controllers/posts");

const router = express.Router();

router.post("/", upload.array("file"), postsController.postPost);

module.exports = router;
