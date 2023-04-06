const Post = require('../models/Post');
const Joi = require('joi');


const deltaOpSchema = Joi.object({
  insert: Joi.alternatives().try(Joi.string(), Joi.object()),
  delete: Joi.number().integer().positive(),
  retain: Joi.number().integer().positive(),
  attributes: Joi.object().optional(),
}).or('insert', 'delete', 'retain');

const deltaSchema = Joi.array().items(deltaOpSchema).min(1);

const commentSchema = Joi.object({
  // Other fields...
  delta: deltaSchema.required(),
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