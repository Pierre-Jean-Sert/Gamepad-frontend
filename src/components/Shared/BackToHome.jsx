/*

* GAMEPAD

* BackToHome component

*/

//! Style import
import "./back-to-home.css";

//! Hooks import
import { useNavigate } from "react-router-dom";

//* FOOTER FUNCTION
function BackToHome() {
  //
  // Def navigate
  const navigate = useNavigate();

  // Return
  return (
    <div
      className="bth"
      onClick={() => {
        navigate("/");
      }}
    >
      <i className="fa-solid fa-backward"></i>
      <p>Return to game list</p>
    </div>
  );
}

export default BackToHome;
