import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormPost from "./Form";
import { useJwt } from "react-jwt";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../utils/queries";
import { DELETE_POST } from "../utils/mutations";
import { Container, Col, Form, Button, Card, Modal } from "react-bootstrap";
const token = localStorage.getItem("id_token");

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);
  const location = window.location.href.match("([^/]+$)")[0];
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { groupName: location[0].toUpperCase() + location.substring(1) },
  },[]);
  const [deletePost] = useMutation(DELETE_POST, {});
  const { decodedToken, isExpired } = useJwt(token);
  
  if (loading) return "loading...";
 
  const userToken = decodedToken.data.username;
 
  const handleFormDone = (e) => {
    setShowModal(false);
    refetch();
  };

  const handleDelete = async (postId) => {
    console.log(postId);
    try {
      const { data, error } = await deletePost({
        variables: { postId },
      });
      refetch();

    } catch (error) {
      console.error(error);
    }
}; 
  
  
  return (
    <>
      <Container>
        {data.allPost.map(({ _id, title, postText, username, groupName }) => {
          return (
            <Card key={_id} border="dark">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{postText}</Card.Text>
                <Card.Text>{username}</Card.Text>
                <Card.Text>{groupName}</Card.Text>
                {/* <Card.Text>{comments}</Card.Text> */}
          
                {
                  username === userToken?
                <Button onClick={() =>handleDelete(_id)}>Delete</Button>
                  :''
                }
                {
                  username === userToken?
                  <Button>Edit</Button>
                  :''
                }
              
              </Card.Body>
            </Card>
          );
        })}
      </Container>

      <Link
        className="btn-lg btn-secondary text-center"
        id="createBtn"
        onClick={() => setShowModal(true)}
        >
        Create post
      </Link>
      <Modal
        size="lg"
        show={showModal}
        aria-labelledby="newpost-modal"
        onHide={() => setShowModal(false)}
        animation={false}
        >
        <Modal.Body >
          <FormPost
          closeModal={() => handleFormDone()}
          ></FormPost>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;

// We would need something along these lines to delete the post ----------------------------------------------------------------
 // const handleDeletePost = async (postId) => {
 //   const token = Auth.loggedIn() ? Auth.getToken() : null;

 //   if (!token) {
 //     return false;
 //   }

 //   try {
 //     await delPost({
 //       variables: { postId },
 //     });

             {/* {Auth.loggedIn() == {username} (
                 <>
                 <Button>Edit</Button>
                 <Button>Delete</Button>
             </>
           )} */}