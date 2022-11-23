const { Schema } = require("mongoose");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
  },
});

module.exports = commentSchema;