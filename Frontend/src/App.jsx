import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Mobile_nav from "./components/Mobile_nav";
const App = () => {
  return (
    //bg-[#36C2CE]
    <div className="App md:h-screen w-full ">
      <div className="md:hidden">
        <Mobile_nav />
      </div>
      <Router>
        <ToastContainer />
        <AnimatedRoutes />
      </Router>
      {/* <div className=" flex justify-center md:hidden">
        <Footer />
      </div> */}
    </div>
  );
};
export default App;