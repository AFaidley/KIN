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
    type Group {
        _id: ID
        groupName: String
        posts: [Post]
    }
    type Comment {
        _id: ID
        username: String!
        commentText: String
        createdAt: String
    }
    type Event {
        _id: ID
        title: String
        username: User!
        eventText: String
    }
    type Query {
        me: User
        posts(username: String): [Post]
        post(_id: ID!): Post
        allPost(groupName: String): [Post]
        # events: Event
        # event: Event
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost(title: String!, postText: String!, username: String!, groupName: String!): Post
        # editPost
        deletePost(postId: ID!): Post
        addComment(postId: ID!, commentText: String!, username: String!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        # editComment

    }

`;
module.exports = typeDefs;