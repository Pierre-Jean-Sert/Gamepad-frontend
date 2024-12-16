/*

* GAMEPAD

* App function

*/

//! Style import
import "./App.css";

//! Libraries import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Cookies from "js-cookie";

//! Pages import
import Games from "./pages/Games/Games";
import Game from "./pages/Game/Game";
import Auth from "./pages/Auth/Auth";

//! Components import
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";

//! Contexts
export const AuthContext = createContext();

//* APP FUNCTION
function App() {
  //
  // States
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);

  // Return
  return (
    <>
      <AuthContext.Provider value={{ userToken, setUserToken }}>
        <Router>
          {/* HEADER */}
          <Header></Header>

          {/* ROUTES */}
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Games></Games>}></Route>

            {/* GAME */}
            <Route path="/game/:gameId" element={<Game></Game>}></Route>

            {/* AUTH */}
            <Route path="/auth" element={<Auth></Auth>}></Route>
          </Routes>

          {/* FOOTER */}
          <Footer></Footer>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
