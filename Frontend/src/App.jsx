import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    //bg-[#36C2CE]
    <div className="App h-screen w-full ">
      <Router>
        <ToastContainer />
        <div className="p-5">
        <Navbar />
        </div>
        <AnimatedRoutes />
      </Router>
    </div>
  );
};
export default App;