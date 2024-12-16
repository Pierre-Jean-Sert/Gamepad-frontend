/*

* GAMEPAD

* Game Description Component 

*/

//! Style import
import "./game-description.css";

//! Images
import noImage from "../../assets/image-not-found.webp";

//* GAME DESCRIPTION FUNCTION
function GameDescription({ data }) {
  //

  // Date formatting
  let formattedDate = "";
  if (data) {
    const releasedDate = new Date(data.released);
    formattedDate = releasedDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // Return
  return (
    <>
      <div className="gd-bloc">
        {/* Game image */}
        <div>
          <img
            src={data.background_image ? data.background_image : noImage}
            alt="Game image"
          />
        </div>

        {/* Game description and links */}
        <div className="gd-right-bloc">
          {/* Save to collection and add a review */}
          <div className="gd-link">
            <div>
              <p>Saved to</p>
              <div>
                <p className="gd-green">Collection</p>
                <i className="fa-regular fa-bookmark"></i>
              </div>
            </div>

            <div>
              <p>Add a </p>
              <div>
                <p>Review</p>
                <i className="fa-regular fa-comment"></i>
              </div>
            </div>
          </div>

          {/* Game details */}

          {/* Platofrms and genre */}
          <article className="gd-details">
            {/* Platofrms */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Platforms</p>
              <p>
                {data.parent_platforms.map((platform, index) => {
                  //
                  let result = "";

                  if (index < data.parent_platforms.length - 1) {
                    result = result + platform.platform.name + ", ";
                  } else {
                    result = result + platform.platform.name;
                  }

                  return <span key={index}>{result}</span>;
                })}
              </p>
            </div>

            {/* Genres */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Genre</p>
              <p>
                {data.genres.map((genre, index) => {
                  //
                  let result = "";

                  if (index < data.genres.length - 1) {
                    result = result + genre.name + ", ";
                  } else {
                    result = result + genre.name;
                  }

                  return <span>{result}</span>;
                })}
              </p>
            </div>
          </article>

          {/* Released date and Developer */}
          <article className="gd-details">
            {/* Released date  */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Released date</p>
              <p>{formattedDate}</p>
            </div>

            {/* Genres */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Developers</p>
              <p>
                {data.developers.map((developer, index) => {
                  //
                  let result = "";

                  if (index < data.developers.length - 1) {
                    result = result + developer.name + ", ";
                  } else {
                    result = result + developer.name;
                  }

                  return <span>{result}</span>;
                })}
              </p>
            </div>
          </article>

          {/* Publisher and age rating */}
          <article className="gd-details">
            {/* Publisher  */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Publisher</p>
              <p>
                {data.publishers.map((publisher, index) => {
                  //
                  let result = "";

                  if (index < data.publishers.length - 1) {
                    result = result + publisher.name + ", ";
                  } else {
                    result = result + publisher.name;
                  }

                  return <span>{result}</span>;
                })}
              </p>
            </div>

            {/* Age rating */}
            <div className="gd-details-bloc">
              <p className="gd-details-title">Age rating</p>
              {data.esrb_rating ? (
                <p>
                  {data.esrb_rating.id} ({data.esrb_rating.name})
                </p>
              ) : (
                <p>No rating</p>
              )}
            </div>
          </article>

          {/* About */}
          <article className="gd-details">
            <div className="gd-about">
              <p className="gd-details-title">About</p>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default GameDescription;
