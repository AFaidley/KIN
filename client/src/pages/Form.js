import React, { useState } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
// import { DELETE_POST } from "../utils/mutations";


const FormPost = ({ group, closeModal }) => {
  const [titleInput, setTitle] = useState("");
  const [postText, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = window.location.href.match("([^/]+$)")[0];
  
  const [createPost] = useMutation(CREATE_POST, {});

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.id;
    const inputValue = target.value;

    if (inputType === "title") {
      setTitle(inputValue);
    } else if (inputType === "content") {
      setText(inputValue);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await createPost({
        variables: { title:titleInput, postText, groupName: location[0].toUpperCase() + location.substring(1) },
      });
     
      if (!titleInput) {
        setErrorMessage("Please enter a title");
        return;
      }
      if (!postText) {
        setErrorMessage("Please enter post content");
        return;
      }
      closeModal(false);

    } catch (error) {
      console.error(error);
    }
}; 
  
  return (
    <section id="forum">
      <form >
        
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
        <button type="button" id="submit-button" onClick={handleFormSubmit} >
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
