import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Slider = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `-${currentIndex * 100}vw` }}
        transition={{ ease: "linear", duration: 1 }}
        style={{ width: `${movies.length * 100}vw` }} // Dynamic width
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="w-screen h-screen bg-cover bg-center flex items-end p-5"
            style={{
              backgroundImage: `url('${movie.ImageURL}')`,
              backgroundSize: "cover", 
              backgroundPosition: "top",
            }}
          >
            <div className="bg-black bg-opacity-50 text-white text-2xl p-3 rounded-md">
              {movie.title}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
