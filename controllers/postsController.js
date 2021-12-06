const Posts = require("../models/postsModel.js");

const postNewPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;

    let newPost = new Posts({
      userId: userId,
      content: content,
      imageUrl: imageUrl,
    });

    const savedPosts = await newPost.save();
    if (savedPosts) {
      return res
        .status(200)
        .set("access-control-allow-origin", "http://localhost:3000")
        .json({
          data: savedPosts,
        });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .join(allPosts);
  } catch (err) {
    res.status(404).join({ message: err.message });
  }
};

module.exports = { postNewPost, getAllPosts };
