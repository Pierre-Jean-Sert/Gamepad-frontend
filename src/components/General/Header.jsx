/*

* GAMEPAD

* Header Component

*/

//! Style import
import "./header.css";

//! Libraries import

//! Hooks import
import { Link } from "react-router-dom";

//! Contexts

//! Images
import logo from "../../assets/gaming-logo.png";

//* HEADER FUNCTION
function Header() {
  //

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
        <Link to="/auth">
          <button className="header-button">Login</button>{" "}
        </Link>
      </div>
    </header>
  );
}

export default Header;
