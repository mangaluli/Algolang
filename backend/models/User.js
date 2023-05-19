const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege: {
    type: String,
    required: true,
    enum: ["user", "mod", "admin", "owner"],
    default: "user",
  },

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  commets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],

  liked_posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  liked_comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
