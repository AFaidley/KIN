import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormPost from './Form';
import { Container, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import Auth from '../utils/auth';
import { GET_POST } from '../utils/queries';

// const NewPost = () => {
//   const [titleInput, setTitle] = useState('');
//   const [postText, setText] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handleInputChange = (e) => {
//     const { target } = e;
//     const inputType = target.id;
//     console.log(inputType);
//     const inputValue = target.value;

//     if (inputType === 'title') {
//       setTitle(inputValue);
//     } else if (inputType === 'content') {
//       setText(inputValue);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     if (!titleInput) {
//       setErrorMessage('Please enter a title');
//       return;
//     }
//     if (!postText) {
//       setErrorMessage('Please enter post content');
//       return;
//     }

//     setTitle('');
//     setText('');
//   };

const NewPost = () => {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // const [allPost, { loading, data }] = useQuery(GET_POST, {
  //   variables: {groupName: 'Chronic Diseases'}
  // });
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {groupName: 'Chronic Diseases'}
  });
  const [createPost] = useMutation(CREATE_POST);
  const [showModal, setShowModal] = useState(false);
  const location = window.location.href.match("([^\/]+$)")[0];
  if (loading) return "loading..."
    console.log(data)
    console.log(data.allPost[0])
    // setSearchedPosts(data.allPost)
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!searchInput) {
      return false;
    }
    
    try {
      // const response = await allPost();
      // const { posts } = await response.data;
      // setSearchedPosts(posts);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSavePost = async () => {
    const postToSave = searchedPosts.find();
    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }
    
    try {
      await createPost({
        variables: { input: postToSave },
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <Container>
          {data.allPost.map(({_id, title, postText, username, groupName}) => {
            return (
              <Card key={_id} border='dark'>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{postText}</Card.Text>
                  <Card.Text>{username}</Card.Text>
                  <Card.Text>{groupName}</Card.Text>
                  {/* <Card.Text>{comments}</Card.Text> */}
                </Card.Body>
              </Card>
            );
          })}
      </Container>

      <Link
        className='btn-lg btn-secondary text-center'
        id='createBtn'
        onClick={() => setShowModal(true)}
      >
        Create post
      </Link>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='newpost-modal'
        animation={false}
      >
        <Modal.Body>
          <FormPost group="Chronic"
            handleModalClose={() => setShowModal(false)}
            onClick={handleFormSubmit}
            // onChange={handleInputChange}
          ></FormPost>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;
