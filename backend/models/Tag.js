const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    required: true,
  },
});

const Tag = mongoose.model("tags", TagSchema);
module.exports = Tag;
