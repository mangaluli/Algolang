const Post = require("../models/Post");
const Delta = require("../models/Delta");
const Comment = require("../models/Comment");

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
    const { post } = req.body;

    if (!post) {
      return res.status(400).send({ message: "Wrong Body!" });
    }

    // to be implemented
    const validation_error = false;

    if (validation_error) {
      return res.status(400).send({ message: "Wrong Body!" });
    }

    const new_delta = new Delta(post.delta);

    await Post.create({ ...post, delta: new_delta._id });
    await new_delta.save();

    return res.status(201).send({ message: "Post created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    return res.status(200).send({ message: "Post updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error!" });
  }
};

exports.addComment = async (req, res) => {
  try {
    // TODO
    const validation_error = false;

    if (validation_error) {
      return res.status(400).send({ message: "Invalid Body!" });
    }

    // NEW COMMENT
    const author = req.session.user._id;
    const new_comment = new Comment({ ...req.body, author });

    // UPDATE POST WITH NEW COMMENT
    const post_id = new_comment.parent;
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).send({ message: "Post Not Found!" });
    }

    const update = { $push: { comments: new_comment._id } };

    await Post.findByIdAndUpdate(post_id, update);
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
    const { post_id } = req.params;
    const user_id = req.session.user._id;

    const post = await Post.findById(post_id);
    if (!post) {
      res.status(404).send({ message: "Post Not Found!" });
    }

    let update, liked;
    if (post.likes.includes(user_id)) {
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
    await Post.findByIdAndUpdate(post_id, update);
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
