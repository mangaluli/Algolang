const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  parent_type: {
    type: String,
    enum: ['post', 'comment'],
    required: true,
  },
  parent_id: {
    type: String,
    required: true,
  },

  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  delta: {
    type: String,
    required: true,
  },

  like_user_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comment_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;