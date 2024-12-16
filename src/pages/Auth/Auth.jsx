/*

* GAMEPAD

* Auth Page
*/

//! Style import
import "./auth.css";

//! Hooks import
import { useState } from "react";

//! Components import
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";

//* AUTH FUNCTION
function Auth() {
  //
  // States
  const [componentMgmt, setComponentMgmt] = useState("login");

  // Return
  return (
    <main className="container screen">
      <div className="auth-bloc">
        {/*  Left bloc */}
        <div className="auth-left-bloc">
          <div>
            <h2>How it works ?</h2>
            <p className="auth-section-red "></p>
          </div>

          {/*  Paragraphs */}
          <div className="auth-paragraph">
            <div>
              <i className="fa-regular fa-user"></i>
              <p>
                Log in to your free account to be able to get all features of
                Gamepad
              </p>
            </div>

            <div>
              <i className="fa-regular fa-bookmark"></i>
              <p>Add a game to your collection</p>
            </div>

            <div>
              <i className="fa-regular fa-comment"></i>
              <p>Leave a review for a game</p>
            </div>
          </div>
        </div>

        {/*  Right bloc */}
        <div className="auth-right-bloc">
          {componentMgmt === "login" && (
            <Login setComponentMgmt={setComponentMgmt}></Login>
          )}
          {componentMgmt === "signup" && (
            <Signup setComponentMgmt={setComponentMgmt}></Signup>
          )}
        </div>
      </div>
    </main>
  );
}

export default Auth;
