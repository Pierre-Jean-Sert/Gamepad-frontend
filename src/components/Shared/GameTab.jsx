/*

* GAMEPAD

* Game Tab component

*/

//! Style import
import "./game-tab.css";

//! Hooks import
import { useNavigate } from "react-router-dom";

//! Images
import noImage from "../../assets/image-not-found.webp";

//* Game Tab FUNCTION
function GameTab({ dataToMap }) {
  //
  // Def navigate
  const navigate = useNavigate();

  // Return
  return (
    <>
      {dataToMap.map((game, index) => {
        //
        return (
          <article
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
          </article>
        );
      })}
    </>
  );
}

export default GameTab;
