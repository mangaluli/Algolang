const mongoose = require('mongoose');

// Has to recieve the same _id as the og post.
const reportSchema = new mongoose.Schema(
  {
    reporter_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: new Date(),
    },
    text: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: 'entity_type' }
);

const Report = mongoose.model('reports', reportSchema);

const UserReport = Report.discriminator(
  'user',
  new mongoose.Schema({
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  })
);

const PostReport = Report.discriminator(
  'post',
  new mongoose.Schema({
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  })
);

const CommentReport = Report.discriminator(
  'comment',
  new mongoose.Schema({
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  })
);

module.exports = { UserReport, PostReport, CommentReport };