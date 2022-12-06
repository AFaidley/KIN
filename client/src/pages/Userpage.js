import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { Container, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { DELETE_POST, EDIT_POST } from "../utils/mutations";
import EditForm from "./EditForm";

const token = localStorage.getItem('id_token');

const Showprofile = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [deletePost] = useMutation(DELETE_POST, {});

    const { loading, error, data, refetch } = useQuery(GET_ME, {});
    if (loading) return 'loading...';
    
    const handleFormEdit = (e) => {
        setShowEdit(false);
        refetch();
    };
    const handleDelete = async (postId) => {
        console.log(data.me.posts._id)
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
        <h1 className="text-center mt-2">Hello {data.me.username}</h1>
        <h3 className="text-center mt-5">Here are your Posts</h3>
      <Container>
        {data.me.posts.map(({ _id, title, postText, groupName }) => {
          return (
            <>
              <Card key={_id} border="dark" className="postCard">
                <Card.Body>
                      <div className="btnContainer">
                      <Button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </Button>
                    </div>
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
                   
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{postText}</Card.Text>
                  <Card.Text>{groupName}</Card.Text>
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
