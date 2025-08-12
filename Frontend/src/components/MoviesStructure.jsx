import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Mobile_view_movieStructure from "./Mobile_view_movieStructure";
import Slider from "./Slider";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Star,Play } from "lucide-react";
import { Link } from "react-router-dom";

const MoviesStructure = ({ movies }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isZoomingIn, setIsZoomingIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0)

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const [movieBackground, setmovieBackground] = useState("");
  const [data, setdata] = useState({});

  const featuredMovies = movies.filter((movie) => movie.featured)
  console.log(featuredMovies);
  const filteredMovies = movies.filter((movie) => {
    const matchesCategory = selectedCategory === "All" || movie.genre === selectedCategory
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredMovies.length])
  


  const navigate = useNavigate();

  const handleClick = async (itemId) => {
    if (window.innerWidth > 640) {
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

  const clickHandler = (movieId) => {
    localStorage.setItem("movieId",movieId);
    return navigate('/Showtime');
  };

  return (
    <>
      <div className="  w-full h-screen md:block hidden ">
        <Navbar />

        {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredMovies[currentSlide]?.backdrop || "/placeholder.svg?height=600&width=1200"}
            alt={featuredMovies[currentSlide]?.title || "Featured Movie"}
            
            className="object-cover"
            
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">{featuredMovies[currentSlide]?.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <Badge variant="secondary" className="bg-red-600 text-white">
                {featuredMovies[currentSlide]?.genre}
              </Badge>
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                {featuredMovies[currentSlide]?.rating}
              </span>
              <span>{featuredMovies[currentSlide]?.year}</span>
              <span>{featuredMovies[currentSlide]?.duration}</span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">{featuredMovies[currentSlide]?.description}</p>
            <div className="flex space-x-4">
              <Link href={`/movie/${featuredMovies[currentSlide]?.id}`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-red-600" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </section>

        {/* <div className=" z-[99] h-screen   text-white ">
          * <motion.div className="bg-black/20 h-1/2 w-1/2 rounded-xl">
            <motion.h1 className="md:text-3xl font-extrabold  p-5 ">
              {data.title}
            </motion.h1>
            <h1 className="text-lg p-5 ">
               |{" "}
              <strong>Genre</strong> {data.genre}
            </h1>
            <p className="p-5 text-lg">{data.description}</p>

            <button
              className="bg-pink-500  font-bold p-1 rounded-xl w-40 m-5"
              onClick={() => {
                localStorage.setItem("movieId", selectedId);
                navigate("/showtime");
              }}
            >
              Book
            </button>
          </motion.div> *
          * <div
            className={`absolute bottom-0 right-0 flex  w-1/2 m-5  ${
              isZoomingIn && "animate-none"
            }`}
          > *
          {movies.length > 0 ? (
            <div className=" w-full text-white">
              <div className="text-2xl font-bold p-1"> Popular Movies</div>
              * <section className="popular-movies w-full overflow-x-auto whitespace-nowrap scroll-smooth ">
                <div className="flex space-x-4 p-4">
                  {movies.length > 0 &&
                    movies.map((item, index) => {
                      return (
                        <div>
                          <div
                            key={index}
                            onClick={() => clickHandler(item._id)}
                            className={`min-w-[80vw] h-96 bg-gray-800 rounded-lg flex items-center justify-center text-white text-center p-2 shadow-md `}
                            style={{
                              backgroundImage: `url('${item.ImageURL}')`,
                              backgroundPosition: "top",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                          <p className="bg-black bg-opacity-50 p-2 rounded-md">
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </section> *
              <Slider movies={movies} />
              <div className="text-2xl font-bold p-1 ">Now in Cinemas</div>
              <section className="Now-cinemas w-full overflow-x-auto whitespace-nowrap scroll-smooth">
                <div className="flex space-x-4 p-4">
                  {movies.length > 0 &&
                    movies.map((movie, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={` h-[150px] w-[150px] rounded-xl`}
                            onClick={() => clickHandler(movie._id)}
                            style={{
                              backgroundImage: `url('${movie.ImageURL}')`,
                              backgroundPosition: "top",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                          <p className="bg-black bg-opacity-50 p-2 rounded-md">
                            {movie.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </section>
              <div className="text-2xl font-bold p-1">Coming soon</div>
              <section className="Now-cinemas w-full overflow-x-auto whitespace-nowrap scroll-smooth">
                <div className="flex space-x-4 p-4">
                  {movies.length > 0 &&
                    movies.map((movie, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={` h-[150px] w-[150px] rounded-xl`}
                            onClick={() => clickHandler(movie._id)}
                            style={{
                              backgroundImage: `url('${movie.ImageURL}')`,
                              backgroundPosition: "top",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                      
                          />
                          <p className="bg-black bg-opacity-50 p-2 rounded-md">
                            {movie.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </section>
            </div>
          ) : (
            //   <div
            //     className=" rounded-full w-[35vw] md:w-[17vw] text-center"
            //     key={movie._id}
            //     // onMouseEnter={() => {
            //     //   if(window.innerWidth > 640){
            //     //     sethoverId(movie._id);
            //     //   }
            //     // }}
            //     // onMouseLeave={() => {
            //     //   if(window.innerWidth > 640){
            //     //     sethoverId(null);
            //     //   }
            //     // }}

            //     onClick={() => {
            //       if (window.innerWidth <= 640) {
            //         localStorage.setItem("movieId", movie._id);
            //         navigate("/showtime");
            //       } else {
            //         setIsZoomingIn(true);
            //         // Wait for the animation to finish, then show the next component
            //         setTimeout(() => {
            //           setmovieBackground(movie.ImageURL);
            //         }, 1800);

            //         setTimeout(() => {
            //           setIsZoomingIn(false);
            //         }, 4000);

            //         // setTimeout(() => {}, 2000);

            //         setdata(movie);
            //       }
            //     }}
            //   >
            //     {/* //h-[50%] xl:h-[70%] w-[100%]  *

            //     <motion.div
            //       onClick={clickhandler}
            //       style={{
            //         backgroundImage: `url(${movie.ImageURL})`,
            //         backgroundSize: "cover",
            //         backgroundPosition: "center",
            //         backgroundRepeat: "no-repeat",
            //       }}
            //       // whileTap={{scale:1.2}}

            //       className={` rounded-full w-[36vw] h-[16.5vh]   md:w-[17vw] md:h-[33vh]  border-2 md:border-2 border-white overflow-hidden rounded-3xl flex justify-center`}
            //     >
            //       {/* {hoverId === movie._id &&
            //   <motion.div
            //   layoutId={movie._id}
            //   onClick={() => handleClick(movie._id)}
            //   initial={{ position: "fixed", opacity:0}}
            //   animate={{
            //     position: "unset",
            //     }}
            //     whileHover={{opacity:1,transition:{duration:1,ease:'easeIn'}}}
            //     // whileTap={{opacity:1,transition:{duration:1,ease:'easeIn'}}}
            //     //bg-[#088395]
            //     className={`movie-card hidden md:flex rounded-full
            //     bg-black/70 text-white flex md:items-center justify-center text-center h-[40vh] md:h-[28vh] xl:h-[35vh] xl:w-[18vw] md:w-[25vw] w-[40vw] p-2   `}
            //     >
            //     <div>

            //     <motion.h2 className="text-white font-bold md:text-2xl">
            //     {movie.title}
            //     </motion.h2>
            //     <motion.h3>
            //       <strong>Release Date:</strong> {movie.release_date.split("T")[0]}
            //       </motion.h3>
            //       <motion.h3 className="hidden md:visible" ><strong>Rating:</strong> {movie.rating}</motion.h3>
            //       <motion.button
            //       onClick={() => {
            //         localStorage.setItem("movieId", movie._id);
            //         navigate("/showtime");
            //         }}
            //         className="bg-pink-500 border-2  w-full text-white font-bold rounded-2xl p-1 relative bottom-0  md:hidden"
            //         >
            //         Book{" "}
            //         </motion.button>
            //         </div>
            //         </motion.div>
            //   } *
            //     </motion.div>
            //     <div className="md:hidden Title font-bold">{movie.title}</div>
            //   </div>

            <motion.div
              className="font-bold text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              Loading movies...
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4 }}
                className="font-bold text-xl"
              >
                <p>
                  Please <strong>Sign Up/Sign In</strong> first
                </p>
              </motion.div>
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
                  className={`absolute z-[999] flex p-5 bg-black/50 md:backdrop-blur-md text-white top-[10%] left-[10%] rounded-3xl  md:w-[80vw]`}
                >
                  <motion.button
                    className={`absolute  top-5 mr-5 xl:left-[97%] md:left-[97%] md:left-[97%] left-[90%]`}
                    onClick={() => setSelectedId(null)}
                  >
                    <span className="material-symbols-outlined text-white">
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
                      {movies.find((i) => i._id === selectedId).Duration} min
                    </motion.h2>
                    * <motion.div>
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
                  </motion.div> *
                    <hr />
                    <motion.button
                      onClick={() => {
                        localStorage.setItem("movieId", selectedId);
                        navigate("/showtime");
                      }}
                      className="bg-pink-600 font-bold text-white cursor-pointer w-3/4 rounded-xl p-2 m-5"
                    >
                      Book Now !
                    </motion.button>
                    * <motion.button className="bg-white font-bold text-black cursor-pointer rounded-xl p-2 m-5 ">Add to WatchList</motion.button> *
                  </div>
                  <div
                    className="h-[50vh] w-[50vw] p-5"
                    style={{
                      backgroundImage: `url(${
                        movies.find((i) => i._id === selectedId).ImageURL
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                  >
                    * <img
                      className="h-3/4"
                      src={movies.find((i) => i._id === selectedId).ImageURL}
                      alt={movies.find((i) => i._id === selectedId).title}
                    /> *
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex justify-center w-full hidden md:flex ">
            <div
              className="border-2 border-black p-1 p-x-2 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              1
            </div>
            <div
              className="border-2 border-black p-1 p-x-2 cursor-pointer"
              onClick={() => {
                navigate("/page1");
              }}
            >
              2
            </div>
          </div>
          </div> 
        </div>

        {/* <motion.div
          className={`absolute left-0 top-0 w-full md:fixed h-full  bg-cover bg-center bg-cover bg-center  transition-transform ${
            isZoomingIn && "animate-zoomRotateIn "
          }`}
          style={{ backgroundImage: `url(${movieBackground})` }}
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
          {/* flex flex-wrap flex-start gap-10 items-start p-5 justify-center md:justify-normal  
        </motion.div>  
      </div>

      *Mobile View*
      <div className="md:hidden">
        <Mobile_view_movieStructure movies={movies} />
      </div> */}
      </div>
    </>
  );
};
export default MoviesStructure;
