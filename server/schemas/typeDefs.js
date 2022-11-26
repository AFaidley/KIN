const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        posts: [Post]
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
        username: User
        group: Group
        comments: [Comment]
    }
    type Group {
        _id: ID
        title: String
        posts: [Post]
    }
    type Comment {
        _id: ID
        username: User
        commentText: String
        createdAt: String
    }
    type Event {
        _id: ID
        title: String
        username: User
        eventText: String
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost(postText: String!, username: User!): Post
        # editPost
        deletePost(post: ID!): Post
        addComment(postId: ID!, commentText: String!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        # editComment

    }


`;
module.exports = typeDefs;