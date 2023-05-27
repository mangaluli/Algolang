const { number } = require("joi");
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
  score: {
    type: Number,
    required: true,
    default: 0,
  },

  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  delta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deltas",
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
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
