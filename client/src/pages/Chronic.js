import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PostForm from "./Form";

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);

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
          <PostForm
          handleModalClose={() => setShowModal(false)}>
          </PostForm>
      </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;