const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Finding user, excluding version and password
        const userInfo = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userInfo;
      }

      throw new AuthenticationError('Unable to login, please try again');
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
      const userLogin = await User.findOne({ email });

      if (!userLogin) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await userLogin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      // If email and password are correct, sign user in with JWT(token)
      const token = signToken(userLogin);
      return { token, userLogin };
    },
  },
};

module.exports = resolvers;