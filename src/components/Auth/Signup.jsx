/*

* GAMEPAD

* Sign up component
*/

//! Style import
import "./login-signup.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

//! Components import

//* SIGNUP FUNCTION
function Signup({ setComponentMgmt }) {
  //
  // States
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [file, setFile] = useState({});
  const [preview, setPreview] = useState(null);

  // Return
  return (
    <div className="logSup-main-bloc">
      <h2>Signup</h2>

      <form className="logSup-login-form">
        <div className="logSup-login-form-first-bloc">
          <input
            className="logSup-large-input"
            id="userName"
            type="text"
            placeholder="Username..."
            name="userName"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            value={userName}
          ></input>

          <input
            className="logSup-large-input"
            id="email"
            type="text"
            placeholder="Email..."
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          ></input>
        </div>

        {/* Password */}
        <div className="logSup-signup">
          <input
            className="logSup-large-input"
            id="password"
            type="password"
            placeholder="Password..."
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          ></input>

          <input
            className="logSup-large-input"
            id="confirmPassword"
            type="password"
            placeholder="Confirm password..."
            name="ConfirmPassword"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            value={confirmPassword}
          ></input>
        </div>

        {/* Image */}
        <div className="logSup-add-image">
          {preview ? (
            <img
              src={preview}
              alt="Aperçu de l'article"
              className="logSup-preview-image"
            />
          ) : (
            <>
              <label htmlFor="file">
                <i className="fa-solid fa-plus"></i> Add a profile image
              </label>
              <input
                className="logSup-large-input"
                id="file"
                type="file"
                name="file"
                onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  setFile(selectedFile);

                  // Condition used to preview the sent image (made with ChatGpt)
                  if (selectedFile) {
                    setPreview(URL.createObjectURL(selectedFile));
                  } else {
                    setPreview(null);
                  }
                }}
              ></input>
            </>
          )}
        </div>

        <div className="logSup-login-form-connection-bloc">
          <button className="logSup-large-button" type="submit">
            Signup
          </button>
          <p
            className="logSup-link"
            onClick={() => {
              setComponentMgmt("login");
            }}
          >
            Already have an account ?
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
