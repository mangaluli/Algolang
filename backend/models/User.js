const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['active', 'muted', 'banned', 'deleted'],
    default: 'active',
  },
  status_duration: {
    type: Number,
    required: true,
    default: 0,
  },
  status_description: {
    type: String,
    required: true,
    default: 'No reason provided..',
  },
  priviliges: {
    type: String,
    required: true,
    enum: ['user', 'mod', 'admin', 'owner'],
    default: 'user',
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  post_ids: {
    type: Array,
  },
  commets_ids: {
    type: Array,
  },
  liked_post_ids: {
    type: Array,
  },
  liked_comment_ids: {
    type: Array,
  },
});

const User = mongoose.model('users', userSchema);
module.exports = User;