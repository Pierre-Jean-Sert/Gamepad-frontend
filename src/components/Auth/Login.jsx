/*

* GAMEPAD

* Log in component
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
import { AuthContext } from "../../Contexts/AuthContext";

//* LOGIN FUNCTION
function Login({ setComponentMgmt }) {
  //
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badRequest, setBadRequest] = useState(null);

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
    if (!email || !password) {
      return setBadRequest("One or more fields are empty");
    }

    //Axios request
    try {
      const response = await axios.post("http://localhost:3000/login", {
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
    <div className="logSup-main-bloc">
      <h2>Login</h2>

      <form className="logSup-login-form" onSubmit={handleSubmit}>
        <div className="logSup-login-form-first-bloc">
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
        </div>

        <div className="logSup-login-form-connection-bloc">
          <button className="logSup-large-button">Login</button>
          <p
            className="logSup-link"
            onClick={() => {
              setComponentMgmt("signup");
            }}
          >
            Don't have an account yet ?
          </p>

          {/* If bad request */}
          {badRequest ? <p className="logSup-badrequest">{badRequest}</p> : ""}
        </div>
      </form>
    </div>
  );
}

export default Login;
