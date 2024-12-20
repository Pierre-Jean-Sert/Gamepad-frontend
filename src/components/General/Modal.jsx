/*

* GAMEPAD

* Modal

*/

//! Style import
import "./modal.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useContext } from "react";

const Modal = ({ visible, setVisible, gameId }) => {
  //
  // States
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [badRequest, setBadRequest] = useState(null);

  console.log(gameId);

  // * handleSubmit sub-function
  const handleSubmit = async (event) => {
    //
    // Prevent browser refresh
    event.preventDefault();

    //Check fields
    if (!title || !text) {
      return setBadRequest("One or more fields are empty");
    }

    //Axios request
    try {
      const response = await axios.post("http://localhost:3000/review/add", {
        email: email,
        password: password,
      });

      //Token collected and stocked in cookies
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });

      //userToken state update
      setUserToken(response.data.token);

      // Name collected and stocked in cookies
      const name = response.data.account.username;
      Cookies.set("name", name, { expires: 7 });

      //Return to home
      navigate("/");

      //
    } catch (error) {
      console.log(error.response.data.error);
      if (
        error.response.data.message === "Incorrect email address or password"
      ) {
        setBadRequest("Incorrect email address or password");
      } else {
        setBadRequest("Server error");
      }
    }
  };

  // Return
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* button to close modal  */}
        <button
          className="modal-close-button"
          onClick={() => {
            setVisible(false);
          }}
        >
          X
        </button>

        {/* Form  */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Review title</label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            ></input>
          </div>

          <div>
            <label htmlFor="description">Review text</label>
            <textarea
              name="text"
              id="text"
              rows="8"
              onChange={(event) => {
                const value = event.target.value;
                setText(value);
              }}
              value={text}
            ></textarea>
          </div>

          <div className="modal-button-publish">
            <button>Publish</button>
          </div>

          {/* If bad request */}
          {badRequest ? <p className="logSup-badrequest">{badRequest}</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default Modal;
