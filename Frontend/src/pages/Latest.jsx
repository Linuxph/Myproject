import React, { useState, useEffect } from "react";
import MoviesStructure from "../components/MoviesStructure";


const Latest = () => {

  const [movies, setMovies] = useState([]);


  useEffect(() => {
    
      const fetchMovies = async () => {
        try {
          const response = await fetch("/api/v1/latest", {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` },
          });
          const data = await response.json()
          setMovies(data.movies || []);    
        } catch (error) {
          toast.error("Error fetching movies:", error);
        }
      };
      fetchMovies();

  }, []);


  return (
   <MoviesStructure movies={movies} />
  );
  
};


export default Latest;
