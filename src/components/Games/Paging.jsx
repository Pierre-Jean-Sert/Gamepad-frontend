/*

* GAMEPAD

* Paging Component

*/

//! Style import
import "./paging.css";

//! Hooks import
import { useState } from "react";

//* PAGING FUNCTION
function Paging({
  data,
  pageNumber,
  setPageNumber,
  setUrl,
  setIsLoading,
  lastPageNumber,
}) {
  //

  // TODO Paging calculator
  function pagingCalculator() {
    //
    const pageTab = [];
    //

    // Return
    return pageTab;
  }

  // Paging and call paging calculator
  const pageTab = pagingCalculator();

  // Return
  return (
    <div className="paging">
      <i
        className="fa-solid fa-chevron-left"
        onClick={() => {
          if (data.previous) {
            setIsLoading(true);
            setUrl(data.previous);
            setPageNumber(pageNumber - 1);
          }
        }}
      ></i>

      {/* Paging calculator */}
      {pageTab.map((page) => {
        return (
          <p key={page} className={page === pageNumber ? "paging-page" : ""}>
            {page}
          </p>
        );
      })}

      <i
        className="fa-solid fa-chevron-right"
        onClick={() => {
          if (data.next) {
            setIsLoading(true);
            setUrl(data.next);
            setPageNumber(pageNumber + 1);
          }
        }}
      ></i>
    </div>
  );
}

export default Paging;
