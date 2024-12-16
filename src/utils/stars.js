/*

* GAMEPAD

* Stars util

*/

//* Stars
const stars = (rating) => {
  //

  const fullstar = Math.round(rating);
  const tab = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullstar) {
      tab.push(1);
    } else {
      tab.push(0);
    }
  }

  return tab;
};

export default stars;
