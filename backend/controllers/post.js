const Post = require('../models/Post');
const PostDelta = require('../models/PostDelta');
const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  author_id: ObjectId().required(),
  date: Joi.string().default(String(Date.now())),
  approved: Joi.boolean().default(false),
  playgroud_url: Joi.string().required(),
  like_user_ids: Joi.array().items(ObjectId()),
  comment_ids: Joi.array().items(ObjectId()),
  preview_image: Joi.string().optional(),
  preview_text: Joi.string().optional(),
});

const postDeltaSchema = Joi.object({
  delta: Joi.string().required(),
});


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).send({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" })
  }
};


exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).send({ message: "Post Not Found!" })
    }

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" })
  }
};


exports.createPost = async (req, res) => {
  try {
    const post_validation_error = postSchema.validate(req.body.post).error;
    const post_delta_validation_error = postDeltaSchema.validate(req.body.delta).error;

    if (post_validation_error || post_delta_validation_error) {
      return res.status(400).send({ message: "Invalid Body!" });
    }

    const post = await Post.create(req.body);
    await PostDelta.create({ _id: post._id, delta: req.body.delta });

    res.status(201).send({ message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error!' });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post_validation_error = postSchema.validate(req.body.post).error;
    const post_delta_validation_error = postDeltaSchema.validate(req.body.delta).error;

    if (post_validation_error || post_delta_validation_error) {
      return res.status(400).send({ message: "Invalid Body!" });
    }

    const post = await Post.findByIdAndUpdate(post_id, req.body, { new: true, runValidators: true });
    const postDelta = await PostDelta.findByIdAndUpdate(post_id, { delta: req.body.delta }, { new: true, runValidators: true });

    if (!post || !postDelta) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post, postDelta });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.log(error);
  }
};


exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id; // Assuming user is authenticated and available in req.user
    const content = req.body.content;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const comment = new Comment({
      content,
      author: userId,
    });
    await comment.save();

    // Add the comment to the post's comments array
    await Post.findByIdAndUpdate(postId, { $addToSet: { comment_ids: comment._id } });

    res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error!" })
  }
};


exports.likePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id; // Assuming user is authenticated and available in req.user

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const isLiked = post.likes.includes(userId);

  // Toggle the like
  const update = isLiked
    ? { $pull: { likes: userId } }
    : { $addToSet: { likes: userId } };

  await Post.findByIdAndUpdate(postId, update);
  res.status(200).json({ message: isLiked ? 'Post unliked' : 'Post liked' });
};