const Posts = require("../models/Posts.js");

const postPost = async (req, res) => {
  try {
    //Is it better to store all req.file?
    const imageURL = req.file.originalname;
    const description = req.body.description;

    let newPost = new Posts({
      imageURL: imageURL,
      description: description,
    });
    console.log(newPost, "INCOMING VALUES");

    //about cors
    // Nodes js server : 5000
    // React Server  : 3000

    // By default Browser says if frontend and backend are not on same ports (Then i
    // it is exploitation/vulnerable)
    // Cross origin resource sharing (CORS)

    //set access-control-allow-origin to prevent CORS error
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
