import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import { DELETE_POST } from '../utils/mutations';



const FormPost = ({group}) => {
  const [titleInput, setTitle] = useState("");
  const [postText, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createPost, { error }] = useMutation(CREATE_POST);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(titleInput, postText)
    try {
      const { data, error } = await createPost({
        variables: { titleInput, postText, group },
      });
        setTitle('');
        setText('');
      } catch (err) {
        console.error(err);
      }
    if (!titleInput) {
      setErrorMessage("Please enter a title");
      return;
    }
    if (!postText) {
      setErrorMessage("Please enter post content");
      return;
    }
  };





  return (
    <section id="forum">
      <form>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Group Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Addiction</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Chronic Disease</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Grief</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Mental Illness</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Physical Disorders</Dropdown.Item>
            <Dropdown.Item href="#/action-3">PTSD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <p>Title:</p>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleInputChange}
          defaultValue={titleInput}
        />
        <p id="message">Message:</p>
        <textarea
          id="content"
          name="content"
          type="text"
          onChange={handleInputChange}
          defaultValue={postText}
        />
        <button type="button" id="submit-button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
      {/* {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div> */}
      {/* )} */}
    </section>
  );
};

export default FormPost;
