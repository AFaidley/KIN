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
  mutation createPost($title: String!, $postText: String!, $groupName: String!) {
    createPost(title: $title, postText: $postText, groupName: $groupName) {
      title
      postText
      groupName
    }
  }
`;

export const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: String!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
   _id
   comments{commentText}
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

export const EDIT_COMMENT = gql`
mutation editComment($postId: ID!, $commentId: ID!, $username: String!, $commentText: String!) {
  editComment(postId: $postId, commentId: $commentId, username: $username, commentText: $commentText) {
   postId
   commentId
   username
   commentText
  }
}
`;

export const EDIT_POST = gql`
mutation editPost($postId: ID!, $title: String!, $postText: String!) {
  editPost(postId: $postId, title: $title, postText: $postText) {
   _id
   title
   postText
  }
}
`;
