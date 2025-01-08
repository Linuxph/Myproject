import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Seats = () => {
  const [book, setbook] = useState(false);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [seat, setseat] = useState([]);
  

  const [SelectedSeatIds, setSelectedSeatIds] = useState([]);
  
  const allRows = ['A', 'B', 'C','D','E','F','G','H','I','J']; 
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const seatdatafetch = async () => {
      try {
        const response = await fetch(
          `/api/v1/booking/seats/${localStorage.getItem(
            "Showtime"
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        const data = await response.json();
        setseat(data.availableSeats);

      } catch (error) {
        toast.error("Error fetching movies:", error);
      }
    };

    seatdatafetch();

    
  }, []);

  const clickHandler = (rowIndex, colIndex) => {
    setbook(true);
    const seatId = `${rowIndex}-${colIndex}`;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });

    const seatid = seat.find(
      (id) => rowIndex === id.row && colIndex === id.column
    )._id;

    setSelectedSeatIds((prevSelectedSeatIds) => {
      if (prevSelectedSeatIds.includes(seatid)) {
        return prevSelectedSeatIds.filter((seat) => seat !== seatid);
      } else {
        return [...prevSelectedSeatIds, seatid];
      }
    });
  };


  const isSelected = (rowIndex, colIndex) => {
    return selectedSeats.includes(`${rowIndex}-${colIndex}`);
  };

  const seatdataUpdate = async () => {
    if (selectedSeats.length == 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/booking/seats/${localStorage.getItem(
          "Showtime"
        )}/${localStorage.getItem("userId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
          body: JSON.stringify({ SelectedSeatIds: SelectedSeatIds }),
        }
      );

      const data = await response.json();

      if (
        data.msg === `Unexpected token '"', ""66caea6cb"... is not valid JSON`
      ) {
        return toast.error("Something went wrong.Try again later.");
      } else {
        navigate("/final");
      }
    } catch (error) {
      toast.error("Failed to update seat booking.");
    }
  };

  return (
    <div className="fixed w-full">
      <div className="container mx-auto">
        {/* Stalls Section */}
        <div className="stalls flex flex-wrap justify-center p-2 items-center gap-2">

        {allRows.map((row) => {
          // Filter seats for the current row
          const seats = seat.filter((data) => data.row === row);

          return (
            <div key={row} className="seatContainer flex space-x-2 mb-1 ">
              {seats.length > 0  ? (
                seats.map((data, index) => (  
                  <div
                    key={`${row}-${index}`}
                    onClick={() => clickHandler(data.row, data.column)}
                    className={`border-black border-2 rounded-lg cursor-pointer md:w-12 md:h-12 w-3 h-3 text-center ${
                      isSelected(data.row, data.column) && "bg-black text-white"
                      }`}
                  >
                      <h1 className={`${window.innerWidth < 640 ? 'hidden' :" block"}`}>
                      {data.row}-{data.column}
                      </h1>
                  </div>
                ))
              ) : (
                <div className="w-12 h-12 border-black border-2 bg-black" /> 
              )}

            </div>
          );
        })}

        </div>

      </div>

      {/* Display selected seats */}
      <div className="mt-4  text-center ">
        {selectedSeats.length > 0 ? (
          <div>
            <h3 className="font-bold text-xl">Selected Seats:</h3>
            <div className="flex justify-center w-full p-2">
              {selectedSeats.map((seat) => {
                const [rowIndex, colIndex] = seat.split("-");
                return (
                  <div
                    key={seat}
                    className="p-3 text-white bg-black rounded-full"
                  >
                    <p>
                      {rowIndex}-{parseInt(colIndex) }
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className={`font-bold text-xl `}>No seats selected.</p>
        )}
      </div>
      <div className="w-full flex justify-center  ">
        <button
          className={`${
            book ? "block" : "hidden"
          } bg-blue-700 text-center p-1   rounded-3xl`}
          onClick={() => seatdataUpdate()}
        >
          BOOK
        </button>
      </div>
    </div>
  );
};

export default Seats;
