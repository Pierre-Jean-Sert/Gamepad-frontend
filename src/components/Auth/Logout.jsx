/*

* GAMEPAD

* Log out component
*/

//! Style import
import "./logout.css";

//! Libraries import
import Cookies from "js-cookie";

//! Hooks import
import { useContext } from "react";

//! Contexts import
import { AuthContext } from "../../Contexts/AuthContext";

//* LOGIN FUNCTION
function Logout() {
  //

  // Import setUserToken
  const { setUserToken } = useContext(AuthContext);

  // Return
  return (
    <div
      className="logout-button"
      onClick={() => {
        setUserToken(null);
        Cookies.remove("token");
        Cookies.remove("name");
      }}
    >
      <i className="fa-solid fa-right-from-bracket"></i>
    </div>
  );
}

export default Logout;
