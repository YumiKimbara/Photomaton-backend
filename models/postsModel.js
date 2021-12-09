const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const postsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
  // {
  //   toObject: { getters: true },
  // }
);

// db.time.insert({ name: "fuga", accessTime: new Date() });

// postsSchema.virtual("timestamp_ms").get(function () {
//   return this.timestamp.getTime();
// });

module.exports = mongoose.model("Posts", postsSchema);
