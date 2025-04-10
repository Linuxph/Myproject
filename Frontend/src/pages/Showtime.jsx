import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Showtime = () => {
  const [dataShowtimes, setdataShowtimes] = useState([]);
  const [movie, setmovie] = useState([]);
  useEffect(() => {
    const showtimeDetailsFetch = async () => {
      try {
        const response = await fetch(
          `/api/v1/booking/showtime/${localStorage.getItem("movieId")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        const data = await response.json();
        setdataShowtimes(data.showtimes || []);
        // console.log(dataShowtimes);
        setmovie(data.movieData || []);

        for (let showtime of data.showtimes) {
          localStorage.setItem("Showtime", showtime._id);
        }
      } catch (error) {
        toast.error("Error fetching movies:", error);
      }
    };
    showtimeDetailsFetch();
  }, []);

  return (
    <div
      className="h-screen flex justify-center md:items-center w-full "
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(59,130,246,1)), 
                      url(${movie.length > 0 ? movie[0].ImageURL : ""})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-screen md:block flex justify-around items-end md:items-center">
        {/* {dataShowtimes.length > 0 ? (
        <div className="showtimeCards flex justify-center w-[10vw] h-[10vh] md:block hidden border-2">
            {dataShowtimes.map((showtimeDetail, index) => (
              //bg-[#2E5077]
              <div key={index} className=' ' >
                <div className="showtimeDetails font-[dancing-script-700] border-2 bg-transparent  border-black p-2 md:h-[45vh] flex gap-10 rounded-2xl text-md md:text-xl font-bold text-white ">
                    <div className=' w-1/2'>
                      <h1 className='md:m-5 m-2'>Title: {movie[0].title}</h1>
                      <h2 className='md:m-5 m-2' >Date: {showtimeDetail.date}</h2>
                      <h2 className='md:m-5 m-2' >Start: {showtimeDetail.startTime.split("T")[1].split(".")[0]}</h2>
                      <h2 className='md:m-5 m-2'>End: {showtimeDetail.endTime.split("T")[1].split(".")[0]}</h2>
                      <h2 className='md:m-5 m-2'>Price: {showtimeDetail.price}</h2>
                      <Link to='/booking'><button className='border-2 border-green-500 w-full text-green-500 hover:text-black md:ml-5 ml-2 rounded-md p-2  bg-black text-white hover:bg-green-500'>Click me </button></Link> 
                    </div>
                    <div className='border-2 border-white rounded-2xl p-2 flex justify-center align-center w-1/2 h-[100%]   overflow-hidden'>
                      <img src={`${movie[0].ImageURL}`} alt='Image' width={300} height={300} />
                    </div>
                </div>
                
              </div>
                
            ))}
        </div>
        ):(
          <p>Currently no, data available.</p>
        )} */}

        <div className="md:w-1/2 w-full h-1/2 md:h-screen  ">
          <motion.div className=" w-full md:h-fit h-fit  p-5 md:text-xl">
            <h1 className="text-5xl text-white font-bold">
              {movie.length > 0 && movie[0].title}
            </h1>
            <p className="text-white font-semibold mt-5 md:mt-10">
              <strong>Gnere :</strong> {movie.length > 0 && movie[0].genre}
            </p>
            <p className="text-white font-semibold mt-5 md:mt-10">
              {movie.length > 0 && movie[0].description}
            </p>
            <p className="text-white font-semibold hidden md:block mt-10">
              <strong>Release Date : </strong>
              {movie.length > 0 && movie[0].release_date.split("T")[0]}
            </p>
            <p className="text-white font-semibold hidden md:block mt-10">
              <strong>Duration : </strong>
              {movie.length > 0 && movie[0].Duration}
            </p>
            <hr />
            <div className="text-white font-bold text-xl mt-5 md:block hidden">
              Showtime Details :
            </div>
            <div className="h-[25vh] w-full border-2 md:block hidden">
              {dataShowtimes.length > 0 &&
                dataShowtimes.map((showtimeDetail, index) => {
                  return (

                    <div key={index}>
                    <div className="showtimeDetails font-[dancing-script-700]  bg-transparent  p-2 md:h-[45vh] flex gap-10 rounded-2xl text-md md:text-xl font-bold text-white ">
                      <div className=" ">
                        <h2 className="md:m-5 m-2">
                          Date: {showtimeDetail.date}
                        </h2>
                        <h2 className="md:m-5 m-2">
                          Start:{" "}
                          {showtimeDetail.startTime.split("T")[1].split(".")[0]}
                        </h2>
                        <h2 className="md:m-5 m-2">
                          End:{" "}
                          {showtimeDetail.endTime.split("T")[1].split(".")[0]}
                        </h2>
                        <h2 className="md:m-5 m-2">
                          Price: {showtimeDetail.price}
                        </h2>
                      </div>
                    </div>
                  </div>
                )
                })}
            </div>

            <Link to="/booking">
              <button className="mt-10 bg-blue-500 hover:bg-blue-600 rounded-3xl p-1 text-lg  font-semibold text-white">
                Book Tickets
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Showtime;
