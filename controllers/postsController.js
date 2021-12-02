const Posts = require("../models/postsModel.js");

const postPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    let newPost = new Posts({
      userId: userId,
      description: description,
      imageUrl: imageUrl,
    });
    console.log(newPost, "INCOMING VALUES");

    const savedPosts = await newPost.save();
    console.log(savedPosts, "SAVED POSTS");
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

module.exports = { postPost };
