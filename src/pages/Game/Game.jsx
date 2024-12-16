/*

* GAMEPAD

* Game page (description of a given game)

*/

//! Style import
import "./game.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//! Components import
import BackToHome from "../../components/Shared/BackToHome";
import Loader from "../../components/General/Loader";
import GameDescription from "../../components/Game/GameDescription";
import GameStatistics from "../../components/Game/GameStatistics";
import GameTab from "../../components/Shared/GameTab";

//* GAME FUNCTION
function Game() {
  //
  // Location destructuring
  const { gameId } = useParams();

  // States
  const [gameData, setGameData] = useState({});
  const [similarGameData, setSimilarGameData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Rawg API Key and Url
  const apiKey = "afbe33d884cf4ff6a866f2f22446a121";
  const gameUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  const similarGameUrl = `https://api.rawg.io/api/games/${gameId}/game-series?key=${apiKey}`;

  //useEffect to recover data from Rawg API
  useEffect(() => {
    //
    const fetchData = async () => {
      //
      try {
        // Axios requests
        const gameResponse = await axios.get(gameUrl);
        const similarGameResponse = await axios.get(similarGameUrl);

        //GameResponse.data stocked in data state
        setGameData(gameResponse.data);

        //GameResponse.data stocked in data state
        setSimilarGameData(similarGameResponse.data);

        //isLoading => false
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, [gameUrl, similarGameUrl]);

  // Return
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <main className="container">
          {/* Return to home */}
          <BackToHome></BackToHome>

          {/* Game description component */}
          <section className="game-description-bloc">
            <h1 className="game-name ">{gameData.name}</h1>
            {/* Bottom red border */}
            <div className="game-red-border"></div>
            <GameDescription data={gameData}></GameDescription>
          </section>

          {/* Similar games */}
          {similarGameData.results.length !== 0 && (
            <section>
              <div className="game-statistics-bloc">
                <h3>In the same series as {gameData.name}</h3>
                <p className="game-section-red"></p>
              </div>

              <div className="sg-general">
                <GameTab dataToMap={similarGameData.results}></GameTab>
              </div>
            </section>
          )}

          {/* Game statistics component */}
          <section>
            <div className="game-statistics-bloc">
              <h3>What do the players think ?</h3>
              <p className="game-section-red"></p>
            </div>
            <GameStatistics data={gameData}></GameStatistics>
          </section>
        </main>
      )}
    </>
  );
}

export default Game;
