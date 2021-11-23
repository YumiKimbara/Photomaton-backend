const Posts = require("../models/Posts.js");

exports.postPost = (req, res) => {
  let newPost = new Posts(req.body);
  newPost.save((err, posts) => {
    if (err) res.send(err);
    res.json({
      data: posts,
    });
  });
  console.log("post res", eq.body);
};
