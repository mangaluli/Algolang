const mongoose = require("mongoose");

const postDeltaSchema = new mongoose.Schema({
  delta: {
    ops: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: false,
        },
        insert: {
          type: Object,
          required: true,
        },
        attributes: Object,
      },
    ],
  },
});

const PostDelta = mongoose.model("postDeltas", postDeltaSchema);
module.exports = PostDelta;
