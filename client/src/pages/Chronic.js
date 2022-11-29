import React, { useState } from "react";

const Chronic = () => {
    const [titleInput, setTitle] = useState("");
    const [postText, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.title;
        const inputValue = target.value;
    
        if (inputType === "titleInput") {
          setTitle(inputValue);
        } else if (inputType === "postText") {
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
    

    
        setTitle("");
        setText("");
     
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
              value={titleInput}
            />
            <p>Message:</p>
            <textarea
              id="content"
              name="content"
              type="text"
              onChange={handleInputChange}
              value={postText}
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
    }


export default Chronic;