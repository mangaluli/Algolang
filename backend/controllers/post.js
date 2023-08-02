const Post = require("../models/Post");
const Delta = require("../models/Delta");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const User = require("../models/User");
const Report = require("../models/Report");

const calculateScore = (post) => {
  const now = new Date();
  const ms = now - post.date;
  const hours_ago = ms / (1000 * 60 * 60);

  // (s-1)/(h+2)^1.5
  const score = (post.likes.length - 1) / (hours_ago + 2) ** 1.5;
  const limited_float = score.toFixed(4);
  return Math.max(limited_float, 0);
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .populate("tags");

    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.getPaginated = async (req, res) => {
  const { page, title, tags, sort_by } = req.query;

  const pageSize = 4;

  try {
    let query = {};

    if (title) {
      query.title = { $regex: `.*${title}.*`, $options: "i" };
    }

    if (tags) {
      query.tags = { $all: tags };
    }

    let sortOptions = {};

    switch (sort_by) {
      case "date_desc":
        sortOptions = { date: -1 };
        break;
      case "date_asc":
        sortOptions = { date: 1 };
        break;
      case "likes_desc":
        sortOptions = { likes: -1 };
        break;
      case "likes_asc":
        sortOptions = { likes: 1 };
        break;
      case "comments_desc":
        sortOptions = { comments: -1 };
        break;
      case "comments_asc":
        sortOptions = { comments: 1 };
        break;
      default:
        sortOptions = { date: -1 };
        break;
    }

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await Post.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("author", "username")
      .populate("tags");

    return res.status(200).json({
      posts,
      totalPages,
      currentPage: parseInt(page),
      totalPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const post = await Post.findById(post_id)
      .populate("author", "username")
      .populate("tags")
      .populate("delta");

    if (!post) {
      return res.status(404).send({ message: "No Post Found!" });
    }

    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.addPost = async (req, res) => {
  try {
    const user = req.session.user;

    const post = req.body;
    if (!post) {
      return res.status(400).send({ message: "Wrong Body!" });
    }

    // to be implemented
    const validation_error = false;
    if (validation_error) {
      return res.status(400).send({ message: "Wrong Body!" });
    }

    const new_delta = new Delta(post.delta);

    const new_post = await Post.create({
      author: post.author._id,
      tags: post.tags.map((tag) => tag._id),
      title: post.title,
      url: post.url,
      delta: new_delta._id,
    });
    await new_delta.save();

    const user_update = {
      $push: { posts: new_post._id },
    };

    const user_id = user._id;
    await User.findByIdAndUpdate(user_id, user_update);

    return res
      .status(201)
      .send({ message: "Post created successfully!", _id: new_post._id });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.updatePost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = req.session.user;

    const post = req.body;
    if (!post) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({ message: "Wrong Body!" });
    }

    // to be implemented
    const validation_error = false;
    if (validation_error) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({ message: "Wrong Body!" });
    }

    let post_to_update = await Post.findById(post._id);
    if (!post_to_update) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Post Not Found!" });
    }

    if (user._id !== String(post_to_update.author._id)) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .send({ message: "Only The Author Can Edit The Post!" });
    }

    let delta_to_update = await Delta.findById(post.delta._id);
    if (!delta_to_update) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Delta Not Found!" });
    }

    delta_to_update.set(post.delta);

    post_to_update.set({
      ...post_to_update,
      tags: post.tags.map((tag) => tag._id),
      title: post.title,
      url: post.url,
    });

    await delta_to_update.save({ session });
    await post_to_update.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).send({ message: "Post updated successfully!" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const user_id = req.session.user._id;
    const post_id = req.params.post_id;

    if (post_id.length !== 24) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const post_to_delete = await Post.findById(post_id);
    if (!post_to_delete) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    if (user_id !== String(post_to_delete.author._id)) {
      return res
        .status(403)
        .send({ message: "Only The Author Can Edit The Post!" });
    }

    const user_update = {
      $pull: { posts: post_id },
    };

    await Promise.all([
      post_to_delete.deleteOne(),
      Delta.findByIdAndDelete(post_to_delete.delta),
      Comment.deleteMany({ _id: { $in: post_to_delete.comments } }),
      User.findByIdAndUpdate(user_id, user_update),
    ]);

    return res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const user_id = req.session.user._id;

    // TODO
    const validation_error = false;
    if (validation_error) {
      return res.status(400).send({ message: "Invalid Body!" });
    }

    const new_comment = new Comment({ ...req.body, author: user_id });

    const post_id = new_comment.parent;
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).send({ message: "Post Not Found!" });
    }

    const post_update = { $push: { comments: new_comment._id } };
    const user_update = { $push: { comments: new_comment._id } };

    await Post.findByIdAndUpdate(post_id, post_update);
    await User.findByIdAndUpdate(user_id, user_update);
    await new_comment.save();

    return res.status(201).send({ message: "Comment posted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

// Toggle Behaviour
exports.likePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.session.user._id;

    const post = await Post.findById(post_id);
    if (!post) {
      res.status(404).send({ message: "Post Not Found!" });
    }

    let post_update, user_update, liked;
    if (post.likes.includes(user_id)) {
      liked = false;
      post_update = {
        $pull: { likes: user_id },
      };
      user_update = {
        $pull: { liked_posts: post._id },
      };
    } else {
      liked = true;
      post_update = {
        $push: { likes: user_id },
      };
      user_update = {
        $push: { liked_posts: post._id },
      };
    }

    await Post.findByIdAndUpdate(post_id, post_update);
    await User.findByIdAndUpdate(user_id, user_update);
    let likes = post.likes.length;
    const delta = liked ? +1 : -1;
    likes += delta;

    return res
      .status(200)
      .send({ message: "Post un/liked successfully", liked, likes });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.reportPost = async (req, res) => {
  try {
    const user_id = req.session.user._id;
    const post = req.body;

    // TODO
    const validation_error = false;
    if (validation_error) {
      return res.status(400).send({ message: "Invalid Post" });
    }

    const post_id = req.params.post_id;
    if (post_id.length !== 24) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const post_to_report = await Post.findById(post_id);
    if (!post_to_report) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    await Report.create({
      refModel: "posts",
      author: user_id,
      parent: post_id,
      report_type: post.report_type,
      report_text: post.report_text,
    });

    return res.status(201).send({ message: "report created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};
