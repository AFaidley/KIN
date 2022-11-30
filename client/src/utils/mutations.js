import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const CREATE_POST = gql`
  mutation createPost($title: String!, $postText: String!, $username: String!, $groupName: String!) {
    createPost(title: $title, postText: $postText, username: $username, groupName: $groupName) {
      title
      postText
      username
      groupName
    }
  }
`;

export const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
  deletePost(postId: $postId) {
    postId
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
   postId
   commentText
  }
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
   postId
   commentId
  }
}
`;





// editpost
// editcomment