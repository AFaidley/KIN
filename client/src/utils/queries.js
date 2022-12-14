import gql from 'graphql-tag';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts{
        _id
        title
        postText
        groupName
      }
    }
  }
`;

export const GET_POST = gql`
  query allPost($groupName: String) {
    allPost(groupName: $groupName) {
      _id
      title
      postText
      username
      groupName
      # createdAt
      comments {
        _id
        commentText
        username
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query post($postId: String) {
    post (postId: $postId){
      _id
      title
      postText
      username
      groupName
      comments {
        commentText
        username
      }
    }
  }
`
