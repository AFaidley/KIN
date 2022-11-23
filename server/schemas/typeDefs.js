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
        username: User
        group: Group
        text: String
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
        text: String
    }
    type Events {
        _id: ID
        title: String
        username: User
        date: String
        time: String
    }
    type Mutation {
        login
        addUser
        createPost
        addComment
        deleteComment
        editComment
        
    }


`;
module.exports = typeDefs;