const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');
const Group = require('./Group');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: String,
  
  comments: [
    {
      commentText: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

  // group: {Group}

const Post = model('post', postSchema)
module.exports = Post;
