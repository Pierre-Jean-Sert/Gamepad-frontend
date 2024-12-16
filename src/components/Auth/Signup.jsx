/*

* GAMEPAD

* Sign up component
*/

//! Style import
import "./login-signup.css";

//! Libraries import
import axios from "axios";
import Cookies from "js-cookie";

//! Hooks import
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//! Contexts import
import { AuthContext } from "../../App";

//* SIGNUP FUNCTION
function Signup({ setComponentMgmt }) {
  //
  // States
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badRequest, setBadRequest] = useState(null);
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState(null);

  // Def navigate
  const navigate = useNavigate();

  // Import setUserToken
  const { setUserToken } = useContext(AuthContext);

  // * handleSubmit sub-function
  const handleSubmit = async (event) => {
    //
    // Prevent browser refresh
    event.preventDefault();

    //Check fields
    if (!userName || !email || !password || !confirmPassword) {
      return setBadRequest("One or more fields are empty");
    }

    //Check passwords
    if (confirmPassword !== password) {
      return setBadRequest("Passwords do not match");
    }

    //Axios request
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username: userName,
        email: email,
        password: password,
      });

      //Token collected and stocked in cookies
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });

      //userToken state update
      setUserToken(response.data.token);

      //Return to home
      navigate("/");

      //
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data.message === "This email already has an account") {
        setBadRequest("This email already has an account");
      } else {
        setBadRequest("Server error");
      }
    }
  };

  // Return
  return (
    <div className="logSup-main-bloc">
      <h2>Signup</h2>

      <form className="logSup-login-form" onSubmit={handleSubmit}>
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

          {/* If bad request */}
          {badRequest ? <p className="logSup-badrequest">{badRequest}</p> : ""}
        </div>
      </form>
    </div>
  );
}

export default Signup;
