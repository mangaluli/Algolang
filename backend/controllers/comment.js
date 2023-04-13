const Post = require('../models/Post');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deltaSchema = Joi.object({
  ops: Joi.array()
    .items(
      Joi.object({
        insert: Joi.alternatives().try(Joi.string().min(1), Joi.object()),
        attributes: Joi.object()
          .pattern(Joi.string(), Joi.alternatives().try(Joi.boolean(), Joi.string(), Joi.number()))
          .optional(),
      })
    )
    .required(),
});

const commentSchema = Joi.object({
  parent_type: Joi.string().valid('post', 'comment').required(),
  parent_id: Joi.string().required(),
  author_id: Joi.objectId().required(),
  author_name: Joi.string().required(),
  date: Joi.date().default(Date.now()).required(),
  delta: deltaSchema.required(),
  like_user_ids: Joi.array().items(Joi.objectId()).default([]),
  comment_ids: Joi.array().items(Joi.objectId()).default([]),
});


exports.addReply = async (req, res) => {
  const comment_id = req.params.comment_id;
  const user_id = req.user._id; // Assuming user is authenticated and available in req.user
  const content = req.body.content;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Create a new reply (as a comment)
  const reply = new Comment({
    content,
    author: user_id,
  });
  await reply.save();

  // Add the reply to the comment's comments array
  await Comment.findByIdAndUpdate(comment_id, { $addToSet: { comments: reply._id } });

  res.status(201).json({ message: 'Reply added', reply });
};

exports.addComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const user_id = req.user._id; // Assuming user is authenticated and available in req.user
  const content = req.body.content;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Create a new reply (as a comment)
  const reply = new Comment({
    content,
    author: user_id,
  });
  await reply.save();

  // Add the reply to the comment's comments array
  await Comment.findByIdAndUpdate(comment_id, { $addToSet: { comments: reply._id } });

  res.status(201).json({ message: 'Reply added', reply });
};


exports.likeComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const user_id = req.user._id;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const isLiked = comment.like_user_ids.includes(user_id);

  const update = isLiked
    ? { $pull: { likes: user_id } }
    : { $addToSet: { likes: user_id } };

  await Post.findByIdAndUpdate(postId, update);
  res.status(200).json({ message: isLiked ? 'Post unliked' : 'Post liked' });
};


exports.editComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const user_id = req.user._id;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

};


exports.deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const user_id = req.user._id;

  const comment = await Comment.findById(comment_id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

};