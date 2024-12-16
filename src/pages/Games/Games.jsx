/*

* GAMEPAD

* Games page (list all games)

*/

//! Style import
import "./games.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

//! Images
import logo from "../../assets/gaming-logo.png";

//! Components import
import Filters from "../../components/Games/Filters";
import Paging from "../../components/Games/Paging";
import GameTab from "../../components/Shared/GameTab";
import Loader from "../../components/General/Loader";

//! Contexts

//* GAMES FUNCTION
function Games() {
  //

  // States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Rawg API Key and Url
  const apiKey = "afbe33d884cf4ff6a866f2f22446a121";
  const defaultUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating`;
  const [url, setUrl] = useState(defaultUrl);

  //useEffect to recover data from Rawg API
  useEffect(() => {
    //
    const fetchData = async () => {
      //
      try {
        // Axios request
        const response = await axios.get(url);

        //Response.data stocked in data state
        setData(response.data);

        // Last page constructor
        const lastPage = Math.ceil(response.data.count / 20);
        setLastPageNumber(lastPage);

        //isLoading => false
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, [url]);

  // Return
  return (
    <main className="container">
      {/* Game header */}
      <section className="games-first-bloc">
        {/* Logo and title */}
        <div className="games-header">
          <img className="games-logo" src={logo} alt="Gamepad logo"></img>
          <h1>Gamepad</h1>
        </div>

        {/* Search bar */}
        <div className="games-search-bar">
          <input
            id="search"
            type="text"
            placeholder="Search for a game..."
            onChange={(event) => {
              setIsLoading(true);

              const userSearch = event.target.value;
              setSearch(userSearch);

              const newUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${userSearch}`;
              setUrl(newUrl);
              setIsSearching(true);
              setPageNumber(1);
            }}
            value={search}
          ></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {/* Search comment */}
        {isLoading || (
          <>
            {isSearching ? (
              <div className="games-is-searching">
                <p className="games-search-result">
                  Search result for "{search}"
                </p>

                <p className="games-search-comment">
                  {data.count.toLocaleString("fr-FR")} games
                </p>
              </div>
            ) : (
              <p className="games-search-comment">
                Search {data.count.toLocaleString("fr-FR")} games
              </p>
            )}
          </>
        )}
      </section>

      {/* Game list */}
      <section className="games-second-bloc">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <>
            {/* Game search filters with component */}
            {isSearching ? (
              <Filters
                setUrl={setUrl}
                apiKey={apiKey}
                search={search}
              ></Filters>
            ) : (
              <h2>Top Rated Games</h2>
            )}

            {/* Game map */}
            <div className="gt-map">
              <GameTab dataToMap={data.results}></GameTab>
            </div>

            {/* Game paging */}
            <Paging
              data={data}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              setUrl={setUrl}
              setIsLoading={setIsLoading}
              lastPageNumber={lastPageNumber}
            ></Paging>
          </>
        )}
      </section>
    </main>
  );
}

export default Games;
