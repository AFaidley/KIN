import React, { useState } from "react";
import { EDIT_POST } from "../utils/mutations";

const EditPost = () => {
  const [titleInput, setTitle] = useState(title);
  const [postText, setText] = useState(postText);
  const [editPost] = useMutation(EDIT_POST, {});

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

    try {
      const { data, error } = await createPost({
        variables: {
          title: titleInput,
          postText,
          groupName: location[0].toUpperCase() + location.substring(1),
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

  const handleEditSubmit = async (postId, titleInput, postText) => {
    setGeorge(!george);
    try {
      const { data, error } = await editPost({
        variables: { postId, title: titleInput, postText },
      });
      refetch();
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
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
};

export default EditPost;
