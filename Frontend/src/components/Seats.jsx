import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Seats = () => {
  const numStallsRows = 5;
  const numStallsCols = 15;
  const numBalconyRows = 5;
  const numBalconyCols = 20;

  const [book, setbook] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [seat, setseat] = useState([{}]);

  const [Color, setColor] = useState([false])

  const navigate = useNavigate();

  useEffect(() => {
    const seatdatafetch =async () => {
      
   
      try {
        const response = await fetch(`http://localhost:3000/api/v1/booking/seats/${localStorage.getItem("Showtime")}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` },
        });
        const data = await response.json();
        setseat(data.seat);
        console.log(seat);
  
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    
  
    }
    
    seatdatafetch();

    const seatdata = () => {
      for (let index = 0; index < seat.length; index++) {
        if(seat[index].isAvailable === false) {
          setColor((prevColors) => {
            const newColors = [...prevColors];  
            newColors[index] = true;  
            return newColors;  
          });
        }
      }
    }

    seatdata();
    console.log(Color);

  }, [])

  
  
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
  };

 
  const getRowLabel = (rowIndex) => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    return rows[rowIndex] || "Unknown";
  };

 
  const isSelected = (rowIndex, colIndex) => {
    return selectedSeats.includes(`${rowIndex}-${colIndex}`);
  };

  const seatdataUpdate = async () => {
    if (selectedSeats.length == 0) {
      toast.error('Please select at least one seat.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/v1/booking/seats/${localStorage.getItem("Showtime")}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',  // Ensure you're specifying JSON content type
          Authorization: `Bearer ${localStorage.getItem('usertoken')}` 
        },
        body: JSON.stringify(selectedSeats)
      });

      console.log(selectedSeats);
  
      // Check if the response is valid JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid JSON response');
      }
  
      // Now try to parse the response
      const data = await response.json();
      console.log(data);
      navigate('/final');
      
    } catch (error) {
      console.error("Error during seat booking:", error);
      toast.error('Failed to update seat booking.');
    }
  };
  


  return (
    <div className="text center">
      <div className="container mx-auto">
        {/* Stalls Section */}
        <div className="stalls flex items-center flex-col gap-2">
          {Array.from({ length: numStallsRows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 flex-wrap">
              {Array.from({ length: numStallsCols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => clickHandler(rowIndex, colIndex)}
                  className={`w-12 h-12 ${
                    isSelected(rowIndex, colIndex) ? "bg-blue-800" : "bg-white" 
                  } ${Color[rowIndex] && 'bg-gray-300'} border-white border-2 rounded-lg cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Balcony Section */}
        <div className="balcony flex items-center flex-col gap-2 mt-4">
          {Array.from({ length: numBalconyRows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 flex-wrap">
              {Array.from({ length: numBalconyCols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => clickHandler(rowIndex + 5, colIndex)} // +5 for balcony rows
                  className={`w-12 h-12 ${
                    isSelected(rowIndex + 5, colIndex)
                      ? "bg-blue-900"
                      : "bg-white"
                  } ${Color[rowIndex] && 'bg-gray-300'} border-white border-2 rounded-lg cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Display selected seats */}
      <div className="mt-4  text-center ">
        {selectedSeats.length > 0 ? (
          <div >
            <h3 className="font-bold text-xl">Selected Seats:</h3>
            <div className="flex justify-center w-full p-2">
            {selectedSeats.map((seat) => {
              const [rowIndex, colIndex] = seat.split("-");
              return (
                <div key={seat} className="p-3 text-white bg-black rounded-full" > 
                  <p>
                     {getRowLabel(parseInt(rowIndex))}-{parseInt(colIndex) + 1}
                  </p>
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          <p  className={`font-bold text-xl `}>No seats selected.</p>
        )}
      </div>
      <div className="w-full flex justify-center  ">
        <button className={`${book ? 'block' : 'hidden'} bg-blue-700 text-center p-1   rounded-3xl`} onClick={()=> seatdataUpdate()}>BOOK</button>
      </div>
    </div>
  );
};

export default Seats;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Seats = () => {
//   const numStallsRows = 5;
//   const numStallsCols = 15;
//   const numBalconyRows = 5;
//   const numBalconyCols = 20;

//   const [book, setBook] = useState(false);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seatsData, setSeatsData] = useState([]); // Array for seat availability
//   const [Color, setColor] = useState([]); // Updated Color array

//   const navigate = useNavigate();

//   // Fetch seat data from the server
//   useEffect(() => {
//     const seatdatafetch = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/v1/booking/seats/${localStorage.getItem(
//             "Showtime"
//           )}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setSeatsData(data.seat);

//         // Map availability to the color array
//         const updatedColor = data.seat.map((seat) => seat.isAvailable ? false : true);
//         setColor(updatedColor);
//       } catch (error) {
//         console.error("Error fetching seats:", error);
//         toast.error("Error fetching seat data.");
//       }
//     };
//     seatdatafetch();
//   }, []);

//   // Handle seat selection
//   const clickHandler = (rowIndex, colIndex) => {
//     setBook(true);
//     const seatId = `${rowIndex}-${colIndex}`;
//     setSelectedSeats((prevSelectedSeats) =>
//       prevSelectedSeats.includes(seatId)
//         ? prevSelectedSeats.filter((seat) => seat !== seatId)
//         : [...prevSelectedSeats, seatId]
//     );
//   };

//   // Update selected seats in the backend
//   const seatdataUpdate = async () => {
//     if (selectedSeats.length === 0) {
//       toast.error("Please select at least one seat.");
//       return;
//     }
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/v1/booking/seats/${localStorage.getItem(
//           "Showtime"
//         )}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//           },
//           body: JSON.stringify({ selectedSeats }), // Ensure correct format
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update seats.");
//       }

//       const data = await response.json();
//       console.log("Booking response:", data);
//       navigate("/final");
//     } catch (error) {
//       console.error("Error during seat booking:", error);
//       toast.error("Failed to update seat booking.");
//     }
//   };

//   const getRowLabel = (rowIndex) => {
//     const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//     return rows[rowIndex] || "Unknown";
//   };

//   const isSelected = (rowIndex, colIndex) => {
//     return selectedSeats.includes(`${rowIndex}-${colIndex}`);
//   };

//   return (
//     <div className="text-center">
//       <div className="container mx-auto">
//         {/* Stalls Section */}
//         <div className="stalls flex items-center flex-col gap-2">
//           {Array.from({ length: numStallsRows }).map((_, rowIndex) => (
//             <div key={rowIndex} className="flex gap-2 flex-wrap">
//               {Array.from({ length: numStallsCols }).map((_, colIndex) => (
//                 <div
//                   key={colIndex}
//                   onClick={() => clickHandler(rowIndex, colIndex)}
//                   className={`w-12 h-12 ${
//                     isSelected(rowIndex, colIndex) ? "bg-blue-800" : "bg-white"
//                   } ${Color[rowIndex * numStallsCols + colIndex] && "bg-gray-300"} 
//                   border-white border-2 rounded-lg cursor-pointer`}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Selected Seats Display */}
//       <div className="mt-4 text-center">
//         {selectedSeats.length > 0 ? (
//           <div>
//             <h3 className="font-bold text-xl">Selected Seats:</h3>
//             <div className="flex justify-center w-full p-2">
//               {selectedSeats.map((seat) => {
//                 const [rowIndex, colIndex] = seat.split("-");
//                 return (
//                   <div
//                     key={seat}
//                     className="p-3 text-white bg-black rounded-full"
//                   >
//                     <p>{getRowLabel(parseInt(rowIndex))}-{parseInt(colIndex) + 1}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <p className="font-bold text-xl">No seats selected.</p>
//         )}
//       </div>

//       <div className="w-full flex justify-center">
//         <button
//           className={`${book ? "block" : "hidden"} bg-blue-700 text-center p-1 rounded-3xl`}
//           onClick={seatdataUpdate}
//         >
//           BOOK
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Seats;
