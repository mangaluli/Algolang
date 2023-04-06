const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  is_admin: {
    type: Boolean,
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