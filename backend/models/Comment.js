const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
},
  { discriminatorKey: 'parent_type' }
);


const Comment = mongoose.model('comments', commentSchema);

const PostComment = Comment.discriminator(
  'post',
  new mongoose.Schema({
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  })
);

const ReplyComment = Comment.discriminator(
  'comment',
  new mongoose.Schema({
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  })
);

module.exports = { PostComment, ReplyComment };