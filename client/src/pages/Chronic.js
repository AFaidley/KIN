import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import FormPost from "./Form";

const NewPost = () => {
  const [titleInput, setTitle] = useState("");
  const [postText, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.id;
    console.log(inputType);
    const inputValue = target.value;

    if (inputType === "title") {
      setTitle(inputValue);
    } else if (inputType === "content") {
      setText(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!titleInput) {
      setErrorMessage("Please enter a title");
      return;
    }
    if (!postText) {
      setErrorMessage("Please enter post content");
      return;
    }

    // setTitle("");
    // setText("");
  };
  return (
    <>
      <Link onClick={() => setShowModal(true)}>Create post</Link>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="newpost-modal"
        animation={false}>
      <Modal.Body>
          <FormPost
          handleModalClose={() => setShowModal(false)} 
          onClick = {handleFormSubmit}
          onChange = {handleInputChange}>
          </FormPost>
      </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;