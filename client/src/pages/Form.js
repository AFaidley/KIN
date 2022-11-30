import React, { useState } from "react";

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
        <p>Title:</p>
        <input
          id="title"
          name="title"
          type="text"
          onChange={onChange}
          defaultValue={titleInput}
        />
        <p>Message:</p>
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
