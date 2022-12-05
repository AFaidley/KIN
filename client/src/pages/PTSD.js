import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormPost from "./Form";
import EditForm from "./EditForm";
import { useJwt } from "react-jwt";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../utils/queries";
import { DELETE_POST, EDIT_POST, ADD_COMMENT } from "../utils/mutations";
import { Container, Col, Form, Button, Card, Modal } from "react-bootstrap";
const token = localStorage.getItem("id_token");

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentText, setCommentText] = useState("");
  const location = window.location.href.match("([^/]+$)")[0];
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { groupName: location[0].toUpperCase() + location.substring(1) },
  }, []);
  const [deletePost] = useMutation(DELETE_POST, {});
  const [editPost] = useMutation(EDIT_POST, {});
  const [addComment, { comData }] = useMutation(ADD_COMMENT, {});
  const { decodedToken, isExpired } = useJwt(token);

  if (loading) return "loading...";

  const userToken = decodedToken.data.username;

  const handleFormDone = (e) => {
    setShowModal(false);
    refetch();
  };

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

  const handleAdd = async (postId) => {
    console.log({ postId: postId, commentText: commentText})
    try {
      const { comData, err } = await addComment({
        variables: { postId: postId, commentText: commentText},
      });
    } catch (err) {
      console.error(err);
    }
  }
  const handleChange = ((event) => {
    console.log(commentText)
    setCommentText(event.target.value);
  })
  return (
    <>
      <h1 className="header-text">PTSD</h1>
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

      <Container>
        {data.allPost.map(({ _id, title, postText, username, groupName, comments }) => {
          return (
            <>
              <Card key={_id} border="dark" className="postCard">
                <Card.Body>
                  {username === userToken ? (
                    <div className="btnContainer">
                      <Button type="button" className="btn btn-secondary" onClick={() => handleDelete(_id)}>Delete</Button></div>
                  ) : (
                    ""
                  )}

                  {username === userToken ? (
                    <>
                      <div className="btnContainer">
                        <Link onClick={() => setShowEdit(true)}><Button type="button" className="btn btn-secondary">Edit</Button></Link></div>
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
                            closeModal={() => handleFormEdit()}
                          ></EditForm>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    ""
                  )}
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{postText}</Card.Text>
                  <Card.Text>{username}</Card.Text>
                </Card.Body>
                {comments.map(({ username, commentText }) => {
                  return (
                    <div>
                      <h6 className="comUser">{username}</h6>
                      <h5 className="comText">{commentText}</h5>
                      <hr className="hrStyle"></hr>
                    </div>
                  )
                })}
                <form className ="form-group" onSubmit={(event) => {
                  event.preventDefault();
                  handleAdd(_id)}}>
                    <label htmlFor="Add comment"></label>
                <textarea className="form-control form-control-lg formBody"type="text" placeholder="Add Comment Text Here" rows="2" onChange={(handleChange)}></textarea>
                <button className="btn-sm btn-secondary addComBtn" type="submit">Add Comment</button>
                </form>
              </Card></>
          );
        })}
      </Container>

    </>
  );
};


export default NewPost;

