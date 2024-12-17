/*

* GAMEPAD

* Add Bookmark Component 

*/

//! Style import
import "../Game/game-description.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//! Contexts import
import { AuthContext } from "../../Contexts/AuthContext";

//* GAME DESCRIPTION FUNCTION
function AddBookmark({ gameId }) {
  //
  // States
  const [isAdded, setIsAdded] = useState(false);
  const [badRequest, setBadRequest] = useState("");

  // Import userToken
  const { userToken } = useContext(AuthContext);

  // States with useEffect to render app when gameId changes
  useEffect(() => {
    // Réinitialise les états si gameId change
    setIsAdded(false);
    setBadRequest("");
  }, [gameId]);

  // * handleSubmit sub-function
  const addBookmarkInDb = async () => {
    //
    if (!userToken) {
      return setBadRequest("Token required");
    }

    //Axios request
    try {
      await axios.post(
        "http://localhost:3000/bookmark/add",
        {
          gameId: gameId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Set isAdded true
      setIsAdded(true);

      //
    } catch (error) {
      console.log(error.response.data.error);
      if (
        error.response.data.message === "Bookmark already in base for this user"
      ) {
        setBadRequest("Bookmark already in base for this user");
      } else {
        setBadRequest("Server error");
      }
    }
  };

  // Return
  return (
    <div
      onClick={() => {
        addBookmarkInDb();
      }}
    >
      {!isAdded && badRequest === "" ? (
        <>
          <p>Saved to</p>
          <div>
            <p className="gd-green">Collection</p>
            <i className="fa-regular fa-bookmark"></i>
          </div>
        </>
      ) : (
        ""
      )}

      {isAdded && badRequest === "" ? (
        <>
          <p className="gd-added">Game added to</p>
          <div className="gd-added">
            <p>Collection</p>
            <i className="fa-solid fa-bookmark"></i>
          </div>
        </>
      ) : (
        ""
      )}

      {badRequest === "Bookmark already in base for this user" ? (
        <>
          <p className="gd-already-in-db ">Game is already in</p>
          <div className="gd-already-in-db ">
            <p>Collection</p>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
        </>
      ) : (
        ""
      )}

      {badRequest === "Token required" ? (
        <>
          <Link className="gd-go-to-login " to="/auth">
            <p className="gd-already-in-db">
              Your need to be logged to use collection
            </p>
            <div className="gd-already-in-db ">
              <p>Click here to login</p>
              <i className="fa-solid fa-right-to-bracket"></i>
            </div>
          </Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddBookmark;
