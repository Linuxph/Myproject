import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import LogoutContextProvider from "./Context/LogoutContextProvider";
import { ToastContainer } from "react-toastify";
import SignInOrNotContext from "./Context/SignInOrNotProvider";
import MovieIdContextProvider from "./Context/MovieIdContextProvider";

const App = () => {
  return (
    <div className="App  h-screen w-full  bg-[#36C2CE]">
      <Router>
        <SignInOrNotContext>
          <LogoutContextProvider>
            <MovieIdContextProvider>
              <ToastContainer />
              <div className="p-5">
                <Navbar />
              </div>
              <AnimatedRoutes />
            </MovieIdContextProvider>
          </LogoutContextProvider>
        </SignInOrNotContext>
      </Router>
    </div>
  );
};

export default App;
