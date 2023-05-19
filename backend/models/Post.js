const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: String(Date.now()),
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
  ],

  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  post_delta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postDeltas",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
