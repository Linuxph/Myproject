import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import { ToastContainer, toast } from "react-toastify";
import Mobile_nav from "./components/Mobile_nav";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { globalError } = useSelector((state) => state.app);

  useEffect(() => {
    if (globalError) {
      toast.error(globalError);
    }
  }, [globalError]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('usertoken');
      const logoutFlag = localStorage.getItem('logout');
      
      if (!token && logoutFlag === 'true') {
        dispatch(logout());
        localStorage.removeItem('logout');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return (
    <div className="App md:h-screen w-full ">
      <div className="md:hidden">
        <Mobile_nav />
      </div>
      <Router>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          newestOnTop
          pauseOnHover
        />
        <AnimatedRoutes />
      </Router>
    </div>
  );
};
export default App;