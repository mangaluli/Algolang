const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: String(Date.now()),
  },
  category: {
    type: String,
    required: true,
  },
  preview_text: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  playgroud_url: {
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

const Post = mongoose.model('posts', postSchema);
module.exports = Post;