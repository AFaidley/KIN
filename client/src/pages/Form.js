import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const FormPost = ({onChange, onClick}) => {
  const [titleInput, setTitle] = useState("");
  const [postText, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          onChange={onChange}
          defaultValue={titleInput}
        />
        <p id="message">Message:</p>
        <textarea
          id="content"
          name="content"
          type="text"
          onChange={onChange}
          defaultValue={postText}
        />
        <button type="button" id="submit-button" onClick={onClick}>
          Submit
        </button>
      </form>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
};

export default FormPost;
