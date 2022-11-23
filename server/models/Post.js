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
  },
  username: User,

  group: Group,

  comments: [Comment],
}
);



const Post = model('post', postSchema)
module.exports = postSchema;
