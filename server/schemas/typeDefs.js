const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        posts: [Post]
    }
    type Post {
        _id: ID
        title: String
        postText: String
        createdAt: String
        username: User
        group: Group
    }
    type Group {
        _id: ID
        title: String
        posts: [Post]
    }
    type Comment {
        _id: ID
        username: User
        post: Post
        commentText: String
        createdAt: String
    }
    type Event {
        _id: ID
        title: String
        username: User
        eventText: String
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost
        addComment
        deleteComment
        editComment

    }


`;
module.exports = typeDefs;