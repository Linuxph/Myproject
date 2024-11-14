import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Showtime = () => {
    const [dataShowtimes, setdataShowtimes] = useState([])
    useEffect(() => {
      const showtimeDetailsFetch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/booking/showtime/${localStorage.getItem("movieId")}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
              },
            });
            const data = await response.json();
            // console.log(data);
            setdataShowtimes(data.showtimes);
            for(let showtime of data.showtimes){
              localStorage.setItem("Showtime",showtime._id);
            }
            console.log(localStorage.getItem("Showtime"));
            console.log(data.showtimes)
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

        showtimeDetailsFetch();
    
    }, [])
    
  return (
    <div className='p-2'>
        <div className="posters m-1 ">
            <img src='/image' alt='image' />
        </div>
        <div className="showtimeCards  flex ">
            {dataShowtimes.map((showtimeDetail, index) => (
                <div key={index} className="showtimeDetails border-2 border-black p-2 rounded-2xl text-xl font-bold bg-blue-600 ">
                    <h1>Title</h1>
                    <h2>Date :{showtimeDetail.startTime.split("T")[0]}</h2>
                    <h2>Start :{showtimeDetail.startTime.split("T")[1].split(".")[0]}</h2>
                    <h2>End :{showtimeDetail.endTime.split("T")[1].split(".")[0]}</h2>
                    <h2>Price :{showtimeDetail.price}</h2>
                    <Link to='/booking'><button className='border-2 border-black  rounded-2xl p-1  bg-black text-white'>Click me to Book.</button></Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Showtime