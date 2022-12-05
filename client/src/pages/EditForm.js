import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_POST } from "../utils/mutations";

const EditForm = ({ group, closeModal }) => {
  const [titleInput, setTitle] = useState('');
  const [postText, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  
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

  const handleFormSubmitEdit = async (postId) => {
    // e.preventDefault();

    try {
      const { data, error } = await editPost({
        variables: {
          title: titleInput,
          postText,
          postId,
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

//   const handleEditSubmit = async (postId, titleInput, postText) => {
   
//     try {
//       const { data, error } = await useEdit({
//         variables: { postId, title: titleInput, postText },
//       });
//       refetch();
//     } catch (error) {
//       console.error(error);
//     }
//   };
  return (
    <section id="forum">
      <form>
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
        <button type="button" id="submit-button" onClick={handleFormSubmitEdit}>
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
