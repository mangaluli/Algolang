const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "refModel",
  },
  refModel: {
    type: String,
    required: true,
    enum: ["users", "posts", "comments"],
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },

  report_type: {
    type: String,
    required: true,
  },
  report_text: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model("reports", reportSchema);
module.exports = Report;
