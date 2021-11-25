const Posts = require("../models/Posts.js");

exports.postPost = async (req, res) => {

  try {
  const image = req.body.image;
  const description = req.body.description;

  let newPost = new Posts({
    image: image,
    description: description,
  });
  await newPost.save((err, posts) => {
    //set for preventing CORS issue
    return res.status(200).set("access-control-allow-origin", "http://localhost:3000").json({
      data: posts,
    });
    
  });
  console.log("post res", req.body);
  } catch(err) {
    res.status(404).json({message: err.message});
  }
 
};
