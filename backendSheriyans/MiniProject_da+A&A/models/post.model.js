const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: "user",
    },
  ],
});
