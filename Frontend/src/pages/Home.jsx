import React, {  useState, useEffect } from "react";
import {toast} from 'react-toastify';
import MoviesStructure from "../components/MoviesStructure";
const Home = () => {
  const [movies, setmovies] = useState([]);
  // const [rating, setrating] = useState(0);
  // const [maxrating, setmaxrating] = useState(5);
  // const [rated, setrated] = useState(0);
  // const handleRating = (index) => {
  //   if(rating > 0){
  //     setrated(index+1);
  //   }
  // }
  useEffect(() => {
    
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/v1/home", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        });
        const data = await response.json();
        setmovies(data.movies || []);
        console.log(data);
      
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
export default Home;