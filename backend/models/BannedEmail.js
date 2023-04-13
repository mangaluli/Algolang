const mongoose = require('mongoose');

// Has to recieve the same _id as the og post.
const BannedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  }
});

const BannedEmail = mongoose.model('bannedEmails', BannedEmailSchema);
module.exports = BannedEmail;