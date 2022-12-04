import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormPost from "./Form";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../utils/queries";
import { Container, Col, Form, Button, Card, Modal } from "react-bootstrap";

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);
  const location = window.location.href.match("([^/]+$)")[0];
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { groupName: location[0].toUpperCase() + location.substring(1) },
  },[]);

  if (loading) return "loading...";

  const handleFormDone = (e) => {
    setShowModal(false);
    refetch();
  };

  return (
    <>
      <Container>
        <h1 className="text-center">PTSD</h1>
        {data.allPost.map(({ _id, title, postText, username }) => {
          return (
            <Card key={_id} border="dark">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{postText}</Card.Text>
                <Card.Text>{username}</Card.Text>
                {/* <Card.Text>{createdAt}</Card.Text> */}
                {/* <Card.Text>{comments}</Card.Text> */}
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
