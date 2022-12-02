import gql from 'graphql-tag';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_POST = gql`
  query allPost($groupName: String) {
    allPost(groupName: $groupName) {
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
  # query allPost {
  #   getPost {
  #     _id
  #     title
  #     postText
  #     username
  #     groupName
  #     # comments [
  #     #   commentText
  #     #   username
  #     # ]
  #   }
  # }
`;
