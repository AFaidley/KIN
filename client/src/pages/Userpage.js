import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { Container, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { DELETE_POST, EDIT_POST } from "../utils/mutations";
import { useJwt } from 'react-jwt';
import EditForm from "./EditForm";

const token = localStorage.getItem('id_token');

const Showprofile = () => {
    
    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken);
    const [showEdit, setShowEdit] = useState(false);
    const [deletePost] = useMutation(DELETE_POST, {});
    
    const userToken = decodedToken.data.username;
    
    const { loading, error, data, refetch } = useQuery(GET_ME, {
        variables: { username: userToken },
    });
    if (loading) return 'loading...';

  const handleFormEdit = (e) => {
    setShowEdit(false);
    refetch();
  };
  const handleDelete = async (postId) => {
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
        HEllo
        {data.me.map(({ _id, title, postText, username, groupName }) => {
          return (
            <>
              <Card key={_id} border="dark" className="postCard">
                <Card.Body>
                  {username === userToken ? (
                    <div className="btnContainer">
                      <Button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}

                  {username === userToken ? (
                    <>
                      <div className="btnContainer">
                        <Link onClick={() => setShowEdit(true)}>
                          <Button type="button" className="btn btn-secondary">
                            Edit
                          </Button>
                        </Link>
                      </div>
                      <Modal
                        size="lg"
                        show={showEdit}
                        aria-labelledby="editpost-modal"
                        onHide={() => setShowEdit(false)}
                        animation={false}
                      >
                        <Modal.Body>
                          <EditForm
                            id={_id}
                            title={title}
                            text={postText}
                            closeModal={() => handleFormEdit()}
                          ></EditForm>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    ''
                  )}
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{postText}</Card.Text>
                  <Card.Text>{username}</Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default Showprofile;
