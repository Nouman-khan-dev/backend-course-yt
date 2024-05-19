const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const postSchema = Schema({
  title: String,
  postData: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
