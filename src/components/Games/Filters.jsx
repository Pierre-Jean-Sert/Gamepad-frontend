/*

* GAMEPAD

* Filters Component

*/

//! Style import
import "./filters.css";

//! Hooks import
import { useState } from "react";

//* FILTERS FUNCTION
function Filters({ setUrl, apiKey, search }) {
  //

  // States
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  //* Url constructor function
  function urlConstructor() {
    //

    const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&`;

    const filters = {
      platforms: selectedPlatform,
      genres: selectedType,
      ordering: selectedSort,
    };

    // Filter constructor
    const filterBuilder = Object.entries(filters)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = baseUrl + filterBuilder;

    // Return
    setUrl(url);
  }

  // Return
  return (
    <div className="filters-section">
      {/* Left bloc */}
      <div className="filters-bloc">
        <div className="filters-div">
          <p>Platform :</p>
          <select
            value={selectedPlatform}
            onChange={(event) => {
              setSelectedPlatform(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="1">PC</option>
            <option value="2">Playstation</option>
            <option value="3">Xbox</option>
            <option value="4">iOS</option>
            <option value="8">Android</option>
            <option value="5">Apple Macintosh</option>
            <option value="6">Linux</option>
            <option value="7">Nintendo</option>
            <option value="9">Atari</option>
            <option value="10">Commodore / Amiga</option>
            <option value="11">Sega</option>
            <option value="12">3DO</option>
            <option value="13">Neo Geo</option>
            <option value="14">Web</option>
          </select>
        </div>

        <div className="filters-div">
          <p>Type : </p>
          <select
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="4">Action</option>
            <option value="5">RPG</option>
            <option value="10">Strategy</option>
            <option value="3">Adventure</option>
            <option value="2">Shooter</option>
            <option value="14">Simulation</option>
            <option value="7">Puzzle</option>
            <option value="11">Arcade</option>
            <option value="1">Racing</option>
            <option value="15">Sports</option>
            <option value="6">Fighting</option>
            <option value="19">Family</option>
            <option value="17">Card</option>
            <option value="34">Educational</option>
            <option value="28">Board Games</option>
            <option value="59">Massively Multiplayer</option>
            <option value="83">Platformer</option>
            <option value="40">Casual</option>
            <option value="51">Indie</option>
          </select>
        </div>
      </div>

      {/* Right bloc */}
      <div className="filters-bloc">
        <div className="filters-div">
          <p>Sort by : </p>
          <select
            value={selectedSort}
            onChange={(event) => {
              setSelectedSort(event.target.value);
            }}
          >
            <option value="">Default</option>
            <option value="-name">Name</option>
            <option value="-released">Released</option>
            <option value="-rating">Rating</option>
            <option value="-metacritic">Metacritic</option>
            <option value="-added">Added</option>
            <option value="-created">Created</option>
            <option value="-updated">Updated</option>
          </select>
        </div>
        <button
          onClick={() => {
            urlConstructor();
          }}
        >
          Go filters !
        </button>
      </div>
    </div>
  );
}

export default Filters;
