const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilige: {
    type: String,
    required: true,
    enum: ["user", "mod", "admin", "owner"],
    default: "user",
  },

  name: {
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

  follower_user_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  post_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  commets_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  following_user_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  liked_post_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  liked_comment_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
