/*

* GAMEPAD

* Game Review Component 

*/

//! Style import
import "./game-reviews.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

//! Components import

//* GAME DESCRIPTION FUNCTION
function GameReviews({ gameId }) {
  //
  // States
  const [reviews, setRewiews] = useState([]);

  //useEffect to recover data from bakcend
  useEffect(() => {
    //

    // Recover reviews list from backend
    const fetchData = async () => {
      //
      try {
        // Axios requests
        const response = await axios.get(
          `http://localhost:3000/review?gameId=${gameId}`
        );

        // Response.data stocked in bookmarks state
        setRewiews(response.data);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, [gameId]);

  // Return
  return (
    <div className="review-general">
      {/* Review header */}
      <div className="review-first-bloc">
        <h4>Most revelant review</h4>
      </div>

      {/* Reviews */}
      <div className="review-list">
        {reviews.map((review) => {
          //
          return (
            <div className="review-card" key="index">
              {/* Review */}
              <h5 key={review.title}>{review.title}</h5>
              <p key={review.text}>{review.text}</p>

              {/* Account */}
              <article className="review-card-footer">
                <div className="review-card-footer-user">
                  <p>Date</p>
                  <p key={review.owner.account.username}>
                    {review.owner.account.username}
                  </p>
                </div>

                {/* Counter */}
                {review.counter === 0 && (
                  <div
                    key={review.counter}
                    className="review-card-footer-counter grey"
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>{review.counter}</p>
                  </div>
                )}

                {review.counter > 0 && (
                  <div
                    key={review.counter}
                    className="review-card-footer-counter green"
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>+{review.counter}</p>
                  </div>
                )}

                {review.counter < 0 && (
                  <div
                    key={review.counter}
                    className="review-card-footer-counter red"
                  >
                    <i className="fa-solid fa-thumbs-down"></i>
                    <p>{review.counter}</p>
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameReviews;
