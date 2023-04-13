
const mongoose = require('mongoose');

// Has to recieve the same _id as the og post.
const BannedIpSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  }
});

const BannedIp = mongoose.model('bannedIps', BannedIpSchema);
module.exports = BannedIp;