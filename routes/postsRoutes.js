const express = require("express");
const multer = require("multer");
const upload = multer();
const Posts = require("../models/postsModel");

const postsController = require("../controllers/postsController");

const router = express.Router();

router.post("/uploadPost", upload.array("file"), postsController.postPost);

router.get('/getPost/:id', async (req, res) => {
    try {
        const post = await Posts.find({ userId: req.params.id })

        return res.status(201).json({
            message: `Successfully get posts from id: ${req.params.id}`,
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router;
