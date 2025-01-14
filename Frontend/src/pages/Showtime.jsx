import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Showtime = () => {
    const [dataShowtimes, setdataShowtimes] = useState([])
    const [movie , setmovie] = useState("");
    useEffect(() => {
      const showtimeDetailsFetch = async () => {
        try {
            const response = await fetch(`/api/v1/booking/showtime/${localStorage.getItem("movieId")}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
              },
            });
            const data = await response.json();
            // console.log(data);
            setdataShowtimes(data.showtimes );
            setmovie(data.movieData || []);
          
            for(let showtime of data.showtimes){
              localStorage.setItem("Showtime",showtime._id);
            }
        } catch (error) {
            toast.error("Error fetching movies:", error);
        }
    };
      showtimeDetailsFetch();
    
    }, [])
    
  return (
    <div className={`h-[90vh]  flex justify-center items-center w-full p-5 `}
    >
      {dataShowtimes.length > 0 ? (
        <div className="showtimeCards flex justify-center w-full ">
            {dataShowtimes.map((showtimeDetail, index) => (
              //bg-[#2E5077]
              <div key={index} className=' ' >
                <div className="showtimeDetails font-[dancing-script-700] border-2 bg-black  border-black p-2 md:h-[45vh] flex gap-10 rounded-2xl text-md md:text-xl font-bold text-white ">
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
                {/* <div style={{backgroundImage:`url(${movie[0].ImageURL})`,backgroundSize:'cover'}} className='w-full' >

                </div> */}
              </div>
                
            ))}
        </div>
        ):(
          <p>Currently no, data available.</p>
        )}
    </div>
  )
}
export default Showtime