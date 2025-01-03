import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import LogoutContextProvider from "./Context/LogoutContextProvider";
import { ToastContainer } from "react-toastify";
import SignInOrNotContext from "./Context/SignInOrNotProvider";
import MovieIdContextProvider from "./Context/MovieIdContextProvider";

const App = () => {
  return (
    //bg-[#36C2CE]
    <div className="App h-screen w-full ">
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
