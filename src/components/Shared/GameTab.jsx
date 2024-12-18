/*

* GAMEPAD

* Game Tab component

*/

//! Style import
import "./game-tab.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//! Images
import noImage from "../../assets/image-not-found.webp";

//! Contexts import
import { AuthContext } from "../../Contexts/AuthContext";

//* Game Tab FUNCTION
function GameTab({
  dataToMap,
  deleteOption,
  isDeleting,
  setIsDeleting,
  setIsLoading,
}) {
  //
  // Import userToken
  const { userToken } = useContext(AuthContext);

  // Def navigate
  const navigate = useNavigate();

  // * Delete Bookmark sub function
  const deleteBookmark = async (gameId) => {
    //
    try {
      // Axios requests
      const response = await axios.delete(
        `http://localhost:3000/bookmark/delete?gameId=${gameId}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Set isDeleting state to render component
      setIsDeleting(!isDeleting);

      //
    } catch (error) {
      console.log(error);
    }
  };

  // Return
  return (
    <>
      {dataToMap.map((game, index) => {
        //
        return (
          <>
            <article className="gt-global">
              <div
                key={index}
                className="gt-article"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/game/${game.id}`);
                }}
              >
                <img
                  key={game.id}
                  src={game.background_image ? game.background_image : noImage}
                  alt="Game image"
                ></img>
                <p key={game.name}>{game.name}</p>
              </div>

              {/* Delete button */}

              {deleteOption ? (
                <div
                  key={"delete" + game.id}
                  className="gt-delete-button"
                  onClick={() => {
                    setIsLoading(true);
                    deleteBookmark(game.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </div>
              ) : (
                ""
              )}
            </article>
          </>
        );
      })}
    </>
  );
}

export default GameTab;
