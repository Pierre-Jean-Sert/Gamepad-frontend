/*

* GAMEPAD

* My Collection page (user's bookmarks)

*/

//! Style import
import "./my-collection.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//! Components import
import BackToHome from "../../components/Shared/BackToHome";
import Loader from "../../components/General/Loader";
import GameTab from "../../components/Shared/GameTab";

//! Contexts import
import { AuthContext } from "../../Contexts/AuthContext";

//* MY COLLECTION FUNCTION
function MyCollection() {
  //
  // Def navigate
  const navigate = useNavigate();

  // Import userToken
  const { userToken } = useContext(AuthContext);

  // States
  const [bookmarks, setBookmarks] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //useEffect to check if user is logged
  useEffect(() => {
    if (!userToken) {
      return navigate("/auth");
    }
  }, [userToken]);

  //useEffect to recover data from bakcend
  useEffect(() => {
    //

    // Recover bookmarks list from backend
    const fetchBookmarksData = async () => {
      //
      try {
        // Axios requests
        const response = await axios.get(
          "http://localhost:3000/bookmark",

          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Response.data stocked in bookmarks state
        setBookmarks(response.data);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchBookmarksData();
  }, [userToken]);

  //useEffect to recover data from Rawg API
  useEffect(() => {
    //
    const fetchGamesData = async () => {
      //

      // Rawg API Key and Url
      const apiKey = import.meta.env.VITE_RAWG_API_KEY;
      const urls = [];

      for (let i = 0; i < bookmarks.length; i++) {
        const gameId = bookmarks[i].gameId;
        const gameUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
        urls.push(gameUrl);
      }

      // Map urls tab to create axios request
      const requests = urls.map((url) => axios.get(url));

      Promise.all(requests)
        .then((responses) => {
          // Data from requests
          const data = responses.map((response) => response.data);
          setGamesData(data);

          //isLoading => false
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //fetchData calling
    fetchGamesData();
  }, [bookmarks]);

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
            <h1 className="game-name ">My Collection</h1>
            {/* Bottom red border */}
            <div className="game-red-border"></div>
          </section>

          <section className="mc-games-list">
            <GameTab dataToMap={gamesData}></GameTab>
          </section>
        </main>
      )}
    </>
  );
}

export default MyCollection;
