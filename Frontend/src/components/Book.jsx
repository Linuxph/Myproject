import { motion } from 'framer-motion';
import React,{useContext, useEffect, useState} from 'react';
import CinemaLayout from './CinemaLayout/CinemaLayout';
import { MdEventSeat } from "react-icons/md";
import MovieIdContext from '../Context/MovieId';



const Book = (props) => {

  const [showDetails, setshowDetails] = useState([]);
  const [seatsDetails, setseatsDetails] = useState([[]]);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/booking/showtime/${localStorage.getItem("movieId")}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` },
        });
        const data = await response.json();
        console.log(data);
        console.log(data.seats[0][0]);
        setseatsDetails(data.seats);
        setshowDetails(data.showtimes);

      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchShowtime();
  }, []);


  return (
    <motion.div
    className=" w-full gap-5 p-5  "
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
    <h1 className='font-extrabold text-3xl text-center pb-5'>Select the seat</h1>
    <CinemaLayout seats={seatsDetails} />

    <div>
      <h1>{`The Selected Seats are: ${seatsDetails[localStorage.getItem('selectedSeats')]}`}</h1>
    </div>
    <div className='mt-5'>
      <div className='flex gap-2 items-center'>
        <h1>Seat occupied:</h1>
        <MdEventSeat color='black'/>
      </div>
      <div className='flex gap-2 items-center'>
        <h1>Seat Available:</h1>
        <MdEventSeat color='white'/>
      </div>
    </div>
  </motion.div>
  );
};

export default Book;
