const Posts = require("../models/postsModel.js");

const postPost = async (req, res) => {
  try {
    const description = req.body.description;

    let newPost = new Posts({
      description: description,
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
