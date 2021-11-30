const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postsSchema = new Schema({
  imageURL: {
    // data: Buffer,
    // contentType: String,
    type: String,
  },
  description: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
