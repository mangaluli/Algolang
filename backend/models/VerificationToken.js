const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 600,
  },
});

const VerificationToken = mongoose.model(
  "verificationTokens",
  verificationTokenSchema
);
module.exports = VerificationToken;
