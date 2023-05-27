const Post = require("../models/Post");
const Delta = require("../models/Delta");
const Comment = require("../models/Comment");

exports.addReply = async (req, res) => {
  try {
    const delta = req.body;
    const { comment_id } = req.params;

    const validation_error = false;
    if (validation_error) {
      return res.status(400).send({ message: "Invalid Body!" });
    }

    const author = req.session.user._id;
    const new_reply = new Reply({ author, delta });

    const post = await Post.findById(comment_id);
    if (!post) {
      return res.status(404).send({ message: "Post Not Found!" });
    }

    const update = { $push: { comments: new_reply } };
    await Post.findByIdAndUpdate(comment_id, update);
    await new_reply.save();

    await res.status(201).send({ message: "Reply posted successfully!" });
  } catch (error) {
    console.log(error);
    await res.status(500).send({ message: "Server Error!" });
  }
};

exports.getComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return res.status(404).send({ message: "Comment Not Found!" });
    }

    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { parent_type, parent_id, page } = req.params;
    const page_size = 10;

    let parent;
    switch (parent_type) {
      case "post": {
        parent = await Post.findById(parent_id);
        break;
      }
      case "comment": {
        parent = await Comment.findById(parent_id);
        break;
      }
      default: {
        return res.status(400).send({ message: "Invalid request!" });
      }
    }

    if (!parent) {
      return res.status(404).send({ message: "Parent Not Found!" });
    }

    const comments = await Comment.find({ _id: { $in: parent.comments } })
      .sort({ _id: -1 })
      .limit(page * page_size)
      .populate("author", "username");

    const canLoadMore = comments.length < parent.comments.length;
    console.log(comments.length, parent.comments.length);
    console.log(canLoadMore);
    return res.status(200).send({ comments, canLoadMore });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const deleted_comment = await Comment.findByIdAndDelete(comment_id);
    if (!deleted_comment) {
      return res.status(404).send({ message: "Comment Not Found!" });
    }

    const parent_id = deleted_comment.parent;

    const update = { $pull: { comments: comment_id } };
    switch (deleted_comment.refModel) {
      case "posts": {
        await Post.findByIdAndUpdate(parent_id, update);
      }
      case "comments":
        await Comment.findByIdAndUpdate(parent_id, update);
    }

    return res.status(200).send({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

// Toggle Behaviour
exports.likeComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const user_id = req.session.user._id;

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      res.status(404).send({ message: "Comment Not Found!" });
    }

    let update, liked;
    if (comment.likes.includes(user_id)) {
      liked = false;
      update = {
        $pull: { likes: user_id },
        // $set: { score: calculateScore(post, -1) },
      };
    } else {
      liked = true;
      update = {
        $push: { likes: user_id },
        // $set: { score: calculateScore(post, +1) },
      };
    }
    await Comment.findByIdAndUpdate(comment_id, update);

    let likes = comment.likes.length;
    const delta = liked ? +1 : -1;

    likes += delta;

    return res
      .status(200)
      .send({ message: "Comment un/liked successfully", liked, likes });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.updateComment = async (req, res) => {
  return res.status(200).send({ message: "Comment edited successfully" });
};
