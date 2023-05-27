const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "refModel",
  },
  refModel: {
    type: String,
    required: true,
    enum: ["posts", "comments"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },

  delta: {
    ops: [
      {
        insert: {
          type: Object,
          required: true,
        },
        attributes: Object,
      },
    ],
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

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
