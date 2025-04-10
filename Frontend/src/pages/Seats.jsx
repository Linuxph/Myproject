import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Armchair } from "lucide-react";

const Seats = () => {
  const [book, setbook] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [seat, setseat] = useState([]);
  const [showTime, setshowTime] = useState({});

  const [SelectedSeatIds, setSelectedSeatIds] = useState([]);

  const allRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const navigate = useNavigate();

  useEffect(() => {
    const seatdatafetch = async () => {
      try {
        const response = await fetch(
          `/api/v1/booking/seats/${localStorage.getItem("Showtime")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        const data = await response.json();
        setseat(data.availableSeats);
        setshowTime(data.showtime || {});
        // console.log(data.showtime);
        // console.log(showTime);
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

  const groupedSeats = seat.reduce((acc, seat) => {
    const { row, column } = seat; 
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});

  const sortedRows = Object.keys(groupedSeats)
    .sort() 
    .map((row) => ({
      row,
      seats: groupedSeats[row].sort((a, b) => a.column - b.column), 
    }));


  return (
    <div className=" w-full text-white h-screen ">
      <div className="md:hidden">
      <div className="w-full flex flex-wrap justify-center">
        <div className="bg-blue-500 w-24 p-1 rounded-lg text-black text-center ">
            
            {/* <h1>{ showTime?.startTime.split("-")[2].split("T")[0] || ""}</h1> */}
            {/* <p>{ showTime?.startTime.split("-")[1] || ""}</p> */}
          
        </div>
      </div>
        {/* <div className="text-center">{showTime?.startTime.split(":")[0].split("T")[1] || ""}:{showTime.startTime.split(":")[1]} - {showTime.endTime.split(":")[0].split("T")[1]}:{showTime.endTime.split(":")[1]} </div> */}
      </div>
        {/* <div className="container mx-auto hidden md:block ">
        {/* Stalls Section */}
        {/* <div className="stalls border-2 border-black flex flex-wrap justify-center p-2 items-center md:gap-2 gap-5  scale-50 md:scale-100 ">

        {allRows.map((row) => {
          
          const seats = seat.filter((data) => data.row === row);
          
          return (
            <div key={row} className="seatContainer flex space-x-2 mb-1 ">
              {seats.length > 0  ? (
                seats.map((data, index) => (  
                  <div
                    key={`${row}-${index}`}
                    onClick={() => clickHandler(data.row, data.column)}
                    className={`border-white border-2 rounded-lg cursor-pointer md:w-12 md:h-12 w-[5vw] h-[5vh] text-center ${
                      isSelected(data.row, data.column) && "bg-blue-300 text-white"
                      }`}
                      >
                      <h1 className={`${window.innerWidth < 640 ? 'hidden' :" block"}`}>
                      {data.row}-{data.column}
                      </h1>
                      </div>
                ))
                ) : (
                <div className="md:w-12 md:h-12 w-6 h-6 border-black border-2 bg-black" /> 
              )}

            </div>
            );
            
            })}

        </div> 

      </div> */}
      <div className="w-full p-10">
        <div className="w-full bg-white text-black text-center">Screen</div>
      </div>
      <div className="flex flex-col items-center gap-2 p-4">
      {sortedRows.map(({ row, seats }) => (
        <div key={row} className="flex gap-2">
          <span className="font-bold">{row}</span> {/* Row label */}
          {seats.map((seat) => (
            
              <Armchair  key={seat._id} 
              onClick={() => clickHandler(seat.row, seat.column)}
              
              className={`h-3 w-3 md:h-12 md:w-12  ${isSelected(seat.row, seat.column) && "text-blue-500 "}`} />
            
          ))}
        </div>
      ))}
    </div>

      {/* Display selected seats */}
      <div className="md:mt-4 text-white text-center text-sm">
        {selectedSeats.length > 0 ? (
          <div>
            <h3 className="font-semibold md:font-bold md:text-xl">
              Selected Seats:
            </h3>
            <div className="flex justify-center w-full p-2">
              {selectedSeats.map((seat) => {
                const [rowIndex, colIndex] = seat.split("-");
                return (
                  <div
                    key={seat}
                    className="p-1 md:p-3 text-white bg-black rounded-full"
                  >
                    <p>
                      {rowIndex}-{parseInt(colIndex)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className={`font-semibold md:font-bold  md:text-xl `}>
            No seats Available.
          </p>
        )}
      </div>
      <div className="w-full flex justify-center mb-4 ">
        <button
          className={`${
            book ? "block" : "hidden"
          } bg-blue-700 text-center p-1 text-sm  rounded-3xl`}
          onClick={() => seatdataUpdate()}
        >
          BOOK
        </button>
      </div>
    </div>
  );
};

export default Seats;
