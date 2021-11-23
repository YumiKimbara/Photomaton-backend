const Posts = require("../models/Posts.js");

exports.postPost = (req, res) => {
  const image = req.body.image;
  const description = req.body.description;

  let newPost = new Posts({
    image: image,
    description: description,
  });
  newPost.save((err, posts) => {
    if (err) res.send(404).json({ err });
    res.json({
      data: posts,
    });
  });
  console.log("post res", eq.body);
};
