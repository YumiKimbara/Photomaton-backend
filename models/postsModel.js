const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
