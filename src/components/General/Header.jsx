/*

* GAMEPAD

* Header Component

*/

//! Style import
import "./header.css";

//! Libraries import
import Cookies from "js-cookie";

//! Hooks import
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

//! Components import
import Logout from "../Auth/Logout";

//! Contexts import
import { AuthContext } from "../../Contexts/AuthContext";

//! Images
import logo from "../../assets/gaming-logo.png";

//* HEADER FUNCTION
function Header() {
  //
  // States
  const [isConnected, setIsconnected] = useState(false);
  const [name, setName] = useState(null);

  // Import userToken
  const { userToken } = useContext(AuthContext);

  // Use effect to check user connection
  useEffect(() => {
    if (userToken) {
      setIsconnected(true);
      setName(Cookies.get("name") || null);
    } else {
      setIsconnected(false);
    }
  }, [userToken]);

  // Return
  return (
    <header className="container">
      <Link to="/">
        <div className="header-left-bloc">
          <img className="header-logo" src={logo} alt="Gamepad logo" />
          <h2>Gamepad</h2>
        </div>
      </Link>

      <div className="header-right-bloc">
        <Link to="/mycollection">
          <p>My collection</p>
        </Link>

        {/* Login button or profile */}

        {isConnected ? (
          <div className="header-isconnected">
            <p>
              <Link to="/myprofile">
                Bienvenue <span>{name}</span>
              </Link>
            </p>

            <Logout></Logout>
          </div>
        ) : (
          <>
            <Link to="/auth">
              <button className="header-button">Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
