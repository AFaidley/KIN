const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Finding user, excluding version and password
        const userInfo = await User.findOne({ _id: context.user._id }).populate('posts').select(
          '-__v -password'
        );
        return userInfo;
      }
      throw new AuthenticationError('Unable to login, please try again');
    },

    post: async (parent, { _id }) => {
      return Post.findOne({ _id: _id });
    },
    allPost: async (parent, { groupName }) => {
      return Post.find({groupName: groupName}).sort({ createdAt: -1 });
    },

  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }
      // If email and password are correct, sign user in with JWT(token)
      console.log(user)
      const token = signToken(user);
      return { token, user };
    },
    createPost: async (parent, { title, postText, groupName }, context) => {
      if (context.user) {
        const post = await Post.create({
          title,
          postText,
          username: context.user.username,
          groupName, // It's here : context.req.params,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, username: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                username: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editPost: async (parent, { postId, postText, title}, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $set: {
              title: title,
              postText: postText,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editComment: async (parent, { postId, commentId, commentText, commentUsername }, context) => {
      if (context.user.username == commentUsername) {
        return Post.findOneAndUpdate(
          [{ _id: postId}, {comment_id: commentId }],
          {
            $set: {
              comment: {
                comment_id: commentId,
                commentText: commentText,
              }
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;