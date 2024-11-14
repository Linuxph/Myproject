import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LogoutContext from "../Context/LogoutContext";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import SignInOrNotContext from "../Context/SignInOrNot";



const Rated = () => {
  const { setlogout } = useContext(LogoutContext);
  const {signIn} = useContext(SignInOrNotContext);

  const [movies, setMovies] = useState([]);
  const [notin, setnotin] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if(signIn){
      const fetchMovies = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/rated", {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` },
          });
          const data = await response.json()
          setMovies(data.movies);
          setlogout(true);    
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }else{
      setnotin(true);
    }

  }, []);

  const handleClick = (itemId) => {
    setSelectedId(itemId === selectedId ? null : itemId);

  };
  
  const [selectedId, setSelectedId] = useState(null);

  return (
    <motion.div
      className=" w-full flex justify-center  "
      initial={{
        opacity: 0,
        filter: "blur(5px)",
        transition: { ease: "easeIn", duration: 0.8 },
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { ease: "easeIn", duration: 1 },
      }}
    >
      <div className={` w-[100%] bg-[#36C2CE]  p-5 flex flex-wrap justify-center gap-8 xl:justify-normal p-5 ${notin ? 'hidden' : 'flex'}`}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <motion.div
              layoutId={movie._id}
              onClick={() => handleClick(movie._id)}
              whileHover={{ scale: 1.1 }}
              key={movie._id}
              className="movie-card bg-[#088395] h-[35vh] md:h-[28vh] xl:h-[36vh] xl:w-[14vw] md:w-[25vw] w-[35vw] p-2 xl:p-3 rounded-3xl"
            >
              <motion.div className="h-[60%] xl:h-[70%] w-[100%] overflow-hidden rounded-3xl">
                <img src={movie.ImageURL} alt={movie.title} />
              </motion.div>
              <motion.h2 className="text-white font-bold">
                {movie.title}
              </motion.h2>
              <motion.h3>
                Release Date: {movie.release_date.split("T")[0]}
              </motion.h3>
              <motion.h3>Rating: {movie.rating}</motion.h3>
            </motion.div>
          ))
        ) : (
          <motion.div
          className="font-bold text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            Loading movies...
          </motion.div>
        )}
        <AnimatePresence>
      {selectedId && (
        <div>
        <motion.div  

          key={selectedId}
          layoutId={selectedId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-[999] flex p-5 backdrop-blur-md text-white top-[10%] left-[10%] rounded-3xl h-[60vh] w-[80vw]">
          <motion.button className={`absolute  top-5 mr-5 xl:left-[97%] md:left-[97%] md:left-[97%] left-[90%]`} onClick={() => setSelectedId(null)}><span className="material-symbols-outlined text-black">close</span></motion.button>
          <div className="h-[100%]  ">
          <motion.h2 className="font-extrabold text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{movies.find((i) => i._id === selectedId).title}</motion.h2><br />
          <motion.h2 className="bg-black/40 rounded-3xl p-5 mb-5"><b>Overview</b> <br />{movies.find((i) => i._id === selectedId).description}</motion.h2>
          <motion.h2 className="mb-5 font-bold ">Release Date :{movies.find((i) => i._id === selectedId).release_date.split("T")[0]} | Genre : {movies.find((i) => i._id === selectedId).genre}</motion.h2>
          <motion.h2 className="mb-5 font-bold ">Rating :{movies.find((i) => i._id === selectedId).rating}</motion.h2>
          <motion.h2 className="mb-5 font-bold ">Duration :{movies.find((i) => i._id === selectedId).duration} min</motion.h2>
          <motion.div>Want to rate :
            <Rating token={usertoken} />
          </motion.div>
          <hr />
          <motion.button onClick={()=>navigate('/booking')} className="bg-pink-600 font-bold text-white cursor-pointer rounded-xl p-2 m-5">Book Now !</motion.button>
          {/* <motion.button className="bg-white font-bold text-black cursor-pointer rounded-xl p-2 m-5 ">Add to WatchList</motion.button> */}

          </div>
          <div className="overflow-hidden h-[100%]  p-5">
            <img src={movies.find((i) => i._id === selectedId).ImageURL} alt={movies.find((i) => i._id === selectedId).title} />
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
      </div>
      <div className={`${notin ? 'block':'hidden'} h-[10vh] bg-black/40 text-center w-[50vw] rounded-3xl  `}>
      <h1 className="text-red-500  text-3xl font-bold">*Sign In First*</h1>
      <Link to='/login' className="text-blue-800">sign In</Link>
      </div>
    </motion.div>
  );
  
};


export default Rated;
