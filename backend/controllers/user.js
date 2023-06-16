const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    let user = await User.findById(user_id, { password: 0, email: 0 });
    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    user = user.toObject();

    user.comment_count = user.comments.length;
    user.post_count = user.posts.length;
    user.liked_post_count = user.liked_posts.length;
    user.liked_comment_count = user.liked_comments.length;

    user.posts = await Post.find({ _id: { $in: user.posts } })
      .sort({ date: -1 })
      .limit(4)
      .populate("author", "username")
      .populate("tags");

    user.comments = await Comment.find({ _id: { $in: user.comments } })
      .sort({ date: -1 })
      .limit(4)
      .populate("author", "username");

    user.liked_posts = await Post.find({ _id: { $in: user.liked_posts } })
      .sort({ date: -1 })
      .limit(4)
      .populate("author", "username")
      .populate("tags");

    user.liked_comments = await Comment.find({
      _id: { $in: user.liked_comments },
    })
      .sort({ date: -1 })
      .limit(4)
      .populate("author", "username");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.getUsersNewPosts = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    const post_ids = user.posts;
    const posts = await Post.find({ _id: { $in: post_ids } })
      .sort({ date: -1 })
      .limit(4)
      .populate("author", "username")
      .populate("tags");

    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" });
  }
};

exports.reportUser = async (req, res) => {};
