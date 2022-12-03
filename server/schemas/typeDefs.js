const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        posts: [Post]!
    }
    type Auth {
    token: ID!
    user: User
    }
    type Post {
        _id: ID
        title: String
        postText: String
        createdAt: String
        username: String!
        groupName: String!
        comments: [Comment]
    }
    type Comment {
        _id: ID
        username: String!
        commentText: String
        createdAt: String
    }
    type Query {
        me: User
        post(_id: ID!): Post
        allPost(groupName: String): [Post]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost(title: String!, postText: String!, username: String!, groupName: String!): Post
        editPost(postId: ID!, username: String!, title: String!, postText: String!): Post
        deletePost(postId: ID!): Post
        addComment(postId: ID!, commentText: String!, username: String!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        editComment(postId: ID!, username: String!, commentId: ID!, commentText: String!): Post
    }

`;
module.exports = typeDefs;