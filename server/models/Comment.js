const { Schema, model } = require("mongoose");
const User = require('./User')
const Post = require('./Post')

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },

  // post: Post,
});

const Comment = model('comment', commentSchema)

module.exports = Comment;