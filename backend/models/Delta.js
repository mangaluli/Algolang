const mongoose = require("mongoose");

const deltaSchema = new mongoose.Schema({
  ops: [
    {
      insert: {
        type: Object,
        required: true,
      },
      attributes: Object,
    },
  ],
});

const Delta = mongoose.model("deltas", deltaSchema);
module.exports = Delta;
