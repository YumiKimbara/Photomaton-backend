const Posts = require("../models/postsModel.js");

exports.postNewPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;
    const userName = req.body.userName;

    let newPost = new Posts({
      userId: userId,
      content: content,
      imageUrl: imageUrl,
      userName: userName,
      comment: comment,
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

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const comment = req.body.comment;
  const id = req.body.id;

  try {
    const newPost = await Posts.findById(id, (err, updated) => {
      updated.comment = comment;
      updated.save();
      res.send(updated);
    });
  } catch (err) {
    console.error(err);
  }
};
