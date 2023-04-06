const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: String(Date.now()),
  },
  approved: {
    type: Boolean,
    default: false,
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

  preview_image: {
    type: String,
  },
  preview_text: {
    type: String,
  }
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;