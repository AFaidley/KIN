import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormPost from './Form';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST } from '../utils/queries';
import { Container, Col, Form, Button, Card, Modal } from 'react-bootstrap';

const NewPost = () => {
  const [titleInput, setTitle] = useState('');
  const [postText, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = window.location.href.match('([^/]+$)')[0];
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {groupName: location.toUpperCase()}
  });

  if (loading) return 'loading...';

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.id;
    console.log(inputType);
    const inputValue = target.value;

    if (inputType === 'title') {
      setTitle(inputValue);
    } else if (inputType === 'content') {
      setText(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!titleInput) {
      setErrorMessage('Please enter a title');
      return;
    }
    if (!postText) {
      setErrorMessage('Please enter post content');
      return;
    }

    // setTitle("");
    // setText("");
  };
  return (
    <>
      <Container>
        {data.allPost.map(({ _id, title, postText, username, groupName }) => {
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
          <FormPost
            handleModalClose={() => setShowModal(false)}
            onClick={handleFormSubmit}
            onChange={handleInputChange}
          ></FormPost>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;
