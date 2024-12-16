/*

* GAMEPAD

* Log in component
*/

//! Style import
import "./login-signup.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

//! Components import

//* LOGIN FUNCTION
function Login({ setComponentMgmt }) {
  //
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Return
  return (
    <div className="logSup-main-bloc">
      <h2>Login</h2>

      <form className="logSup-login-form">
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
        </div>
      </form>
    </div>
  );
}

export default Login;
