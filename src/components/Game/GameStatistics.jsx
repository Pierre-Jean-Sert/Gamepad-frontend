/*

* GAMEPAD

* Game Statistics Component 

*/

//! Style import
import "./game-statistics.css";

//! Libraries import
import ReactApexCharts from "react-apexcharts";

//! Hooks import
import { useState } from "react";

//! Components import
import stars from "../../utils/stars";

//! Images
import reddit from "../../assets/reddit-logo.png";
import twitch from "../../assets/twitch-logo.png";
import youtube from "../../assets/youtube-logo.png";

//* GAME DESCRIPTION FUNCTION
function GameStatistics({ data }) {
  //

  // Stars
  let rating = "";
  if (data.rating) {
    rating = stars(data.rating);
  }

  // Pied data
  const pieData = data.ratings
    ? data.ratings.map((rating) => rating.count)
    : [];
  const pieLegend = data.ratings
    ? data.ratings.map((rating) => rating.title)
    : [];

  const chartOptions = {
    series: pieData,
    options: {
      chart: {
        type: "donut",
        offsetY: 20,
      },
      labels: pieLegend,
      legend: {
        labels: {
          colors: "#FFFFFF",
        },
        position: "bottom",
      },
      stroke: {
        show: false,
      },
    },
  };

  // Return
  return (
    <>
      <div className="gs-bloc">
        {/* Statistics bloc */}
        <div className="gs-left-bloc">
          {/* Social networks */}
          <div className="gs-social-networks">
            <div className="gs-social-networks-bloc">
              <img
                className="gs-click"
                src={reddit}
                alt="Reddit logo"
                onClick={() => {
                  if (data.reddit_url !== "") {
                    window.location.href = data.reddit_url;
                  }
                }}
              />
              <p>{data.reddit_count.toLocaleString("fr-FR")}</p>
            </div>

            <div className="gs-social-networks-bloc">
              <img src={twitch} alt="Reddit logo" />
              <p>{data.twitch_count.toLocaleString("fr-FR")}</p>
            </div>

            <div className="gs-social-networks-bloc">
              <img src={youtube} alt="Reddit logo" />
              <p>{data.youtube_count.toLocaleString("fr-FR")}</p>
            </div>
          </div>

          {/* Ratings*/}
          <div className="gs-social-networks">
            <div className="gs-social-networks-bloc">
              <p>Rating</p>
              <div className="gs-rating">
                {rating
                  ? rating.map((star, index) => {
                      return star === 1 ? (
                        <i key={index} className="fa-solid fa-star"></i>
                      ) : (
                        <i key={index} className="fa-regular fa-star"></i>
                      );
                    })
                  : "No rating"}
              </div>
            </div>

            <div className="gs-social-networks-bloc">
              <p>Reviews</p>
              <div className="gs-rating">
                {data.reviews_count.toLocaleString("fr-FR")}
              </div>
            </div>
          </div>

          {/* Metacritic*/}
          <div className="gs-social-networks">
            <div className="gs-social-networks-bloc">
              <p>Metacritic</p>
              <div
                className={
                  data.metacritic > 50
                    ? "gs-metacritic gs-metacritic-green"
                    : "gs-metacritic gs-metacritic-red"
                }
                onClick={() => {
                  if (data.metacritic_url !== "") {
                    window.location.href = data.metacritic_url;
                  }
                }}
              >
                {data.metacritic ? data.metacritic + " / 100" : "No rating"}
              </div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="gs-right-bloc">
          <ReactApexCharts
            options={chartOptions.options}
            series={chartOptions.series}
            type="donut"
            height={310}
          />
        </div>
      </div>
    </>
  );
}

export default GameStatistics;
