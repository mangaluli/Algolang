const mongoose = require('mongoose');

// Has to recieve the same _id as the og post.
const postDeltaSchema = new mongoose.Schema({
  delta: {
    type: String,
    required: true,
  },
});

const PostDelta = mongoose.model('posts', postDeltaSchema);
module.exports = PostDelta;