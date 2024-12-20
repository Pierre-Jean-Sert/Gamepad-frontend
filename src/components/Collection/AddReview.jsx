/*

* GAMEPAD

* Add Review Component 

*/

//! Hooks import
import { useContext } from "react";

//! Components import
import Modal from "../General/Modal";

//! Contexts import
import { ModalContext } from "../../Contexts/ModalContext";

//* GAME DESCRIPTION FUNCTION
function AddReview({ gameId }) {
  //
  // Import visible, setVisible
  const { visible, setVisible } = useContext(ModalContext);

  // Return
  return (
    // Click to activate modal
    <div
      onClick={() => {
        setVisible(!visible);
      }}
    >
      <p>Add a </p>
      <div>
        <p>Review</p>
        <i className="fa-regular fa-comment"></i>
      </div>
    </div>
  );
}

export default AddReview;
