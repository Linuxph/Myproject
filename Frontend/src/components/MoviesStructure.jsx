import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const MoviesStructure = ({movies,dataimage}) => {
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const handleClick = async (itemId) => {
        if(window.innerWidth > 640){
          setSelectedId(itemId === selectedId ? null : itemId);
        }
        
        // try {
        //   const response = await fetch(
        //     `http://localhost:3000/api/v1/rating/${userId}/${itemId}`,
        //     {
        //       method: "GET",
        //       headers: { Authorization: `Bearer ${usertoken}` },
        //     }
        //   );
        //   const data = await response.json();
        //   setrating(data.ratingValue);
        // } catch (error) {
        //   console.error("Error fetching movies:", error);
        // }
    };
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
      <div className=" w-[100%]  fixed p-5 flex flex-wrap justify-center gap-8 xl:justify-normal  p-5">
        
          {movies.length > 0 ? (
          movies.map((movie,index) => (
            <motion.div
              layoutId={movie._id}
              onClick={() => handleClick(movie._id)}
              whileHover={{ scale: 1.1 }}
              key={movie._id}
              initial={{position:'fixed'}} 
              animate={{position:"unset"}}
              //bg-[#088395]
              className="movie-card bg-black text-white  h-[40vh] md:h-[28vh] xl:h-[36vh] xl:w-[14vw] md:w-[25vw] w-[40vw] p-2 xl:p-3 rounded-3xl"
            >
              <motion.div className="h-[50%] xl:h-[70%] w-[100%] border-2 md:border-0 overflow-hidden rounded-3xl flex justify-center">
                <img src={movie.ImageURL} alt={movie.title} />
              </motion.div>
              <motion.h2 className="text-white font-bold">
                {movie.title}
              </motion.h2>
              <motion.h3 >
                {/* Release Date: {movie.release_date.split("T")[0]} */}
              </motion.h3>
              <motion.h3>Rating: {movie.rating}</motion.h3>
              <motion.button onClick={() => { localStorage.setItem("movieId",movie._id); navigate('/showtime') }} className="bg-pink-500 border-2 text-white font-bold rounded-2xl p-1 relative bottom-0  md:hidden">Book </motion.button>
            </motion.div>
            
          ))
        ) :  (
          <motion.div
            className="font-bold text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            Loading movies...
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:4}} className="font-bold text-xl" ><p>Please <strong>Sign Up/Sign In</strong> first</p></motion.div>
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
                className={`absolute z-[999] flex p-5  md:backdrop-blur-md text-white top-[10%] left-[10%] rounded-3xl md:h-[60vh] md:w-[80vw]`}
              >
                <motion.button
                  className={`absolute  top-5 mr-5 xl:left-[97%] md:left-[97%] md:left-[97%] left-[90%]`}
                  onClick={() => setSelectedId(null)}
                >
                  <span className="material-symbols-outlined text-black">
                    close
                  </span>
                </motion.button>
                <div className="h-[100%]  ">
                  <motion.h2 className="font-extrabold text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {movies.find((i) => i._id === selectedId).title}
                  </motion.h2>
                  <br />
                  <motion.h2 className="bg-black/40 rounded-3xl p-5 mb-5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    <b>Overview</b> <br />
                    {movies.find((i) => i._id === selectedId).description}
                  </motion.h2>
                  <motion.h2 className="mb-5 font-bold  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Release Date :
                    {
                      movies
                        .find((i) => i._id === selectedId)
                        .release_date.split("T")[0]
                    }{" "}
                    | Genre : {movies.find((i) => i._id === selectedId).genre}
                  </motion.h2>
                  <motion.h2 className="mb-5 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                    Rating :{movies.find((i) => i._id === selectedId).rating}
                  </motion.h2>
                  <motion.h2 className="mb-5 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                    Duration :
                    {movies.find((i) => i._id === selectedId).duration} min
                  </motion.h2>
                  {/* <motion.div>
                    Want to rate :
                    <motion.div className="pb-2 flex gap-1">
                      {[...Array(maxrating)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={24}
                          color={`${rated ? 'yellow':'gray'}`}
                          onClick={handleRating}
                        />
                      ))}
                    </motion.div>
                  </motion.div> */}
                  <hr />
                  <motion.button
                    onClick={() => { localStorage.setItem("movieId",selectedId); navigate('/showtime')}}
                    className="bg-pink-600 font-bold text-white cursor-pointer rounded-xl p-2 m-5"
                  >
                    Book Now !
                  </motion.button>
                  {/* <motion.button className="bg-white font-bold text-black cursor-pointer rounded-xl p-2 m-5 ">Add to WatchList</motion.button> */}
                </div>
                <div className="h-[100%]  p-5">
                  <img
                    className="h-[50vh] w-[45vw]"
                    src={movies.find((i) => i._id === selectedId).ImageURL}
                    alt={movies.find((i) => i._id === selectedId).title}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <div className="flex justify-center w-full ">
          <div className="border-2 border-black p-1 p-x-2 cursor-pointer" onClick={()=>{navigate('/home')}}>1</div>
          <div className="border-2 border-black p-1 p-x-2 cursor-pointer" onClick={() => {navigate('/page1')}}>2</div>
        </div>
      
      </div>
    </motion.div>
  )
}
export default MoviesStructure