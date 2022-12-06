import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_POST } from "../utils/mutations";
import { GET_SINGLE_POST } from "../utils/queries"

const EditForm = ({ group, closeModal, id, title, text}) => {
  const [titleInput, setTitle] = useState('');
  const [postText, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const location = window.location.href.match("([^/]+$)")[0];
console.log(id);
  const { loading, error, data, refetch } = useQuery(
    GET_SINGLE_POST,
    {
      variables: {
        postId: id,
      },
    },
    []
  );
  
  const [editPost] = useMutation(EDIT_POST, {});

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
    // const singlePost = key;
    console.log("Here I am");
    
    try {
      const { data, error } = await editPost({
        variables: {
          postId: id,
          title: titleInput,
          postText,
        },
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
      <form>
        <p>Title:</p>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleInputChange}
          defaultValue={title}
        />
        <p id="message">Message:</p>
        <textarea
          id="content"
          name="content"
          type="text"
          onChange={handleInputChange}
          defaultValue={text}
        />
        <button type="button" id="submit-button" onClick={handleFormSubmit}>
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

export default EditForm;
