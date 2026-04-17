import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Latest from "./Latest";
import Rated from "./Rated";
import Home from "./Home";
import { AnimatePresence } from "framer-motion";
import Showtime from "./Showtime";
import Seats from "./Seats";
import Final from "./Final";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import Pagination from "../components/Pagination";
import Glass from "../pages/Glass";
import ForgetPassword from "./ForgetPassword";
import Movie from "../pages/Movie";
import AuthPage from "./AuthPath";
import ProtectedRoute from "../components/ProtectedRoute";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/glass" element={<Glass />} />
        <Route
          path="/adminHome"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <Movie />
            </ProtectedRoute>
          }
        />

        <Route path="/page1" element={<Pagination />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Showtime />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Seats />
            </ProtectedRoute>
          }
        />
        <Route path="/latest" element={<Latest />} />
        <Route path="/rated" element={<Rated />} />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <Final />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
