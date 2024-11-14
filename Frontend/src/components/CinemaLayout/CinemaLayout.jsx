import React, { useState } from 'react';
import Seat from './Seat';
// import { json } from 'react-router-dom';

const CinemaLayout = () => {
  const numStallsRows = 5;
  const numStallsCols = 20;
  const numBalconyRows = 5;
  const numBalconyCols = 15;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, col) => {
    const newSelectedSeats = [...selectedSeats];
    const seatIndex = newSelectedSeats.findIndex(
      (seat) => seat.row === row && seat.col === col
    );

    if (seatIndex !== -1) {
      newSelectedSeats.splice(seatIndex, 1);
    } else {
      newSelectedSeats.push({ row, col });
    }

    setSelectedSeats(newSelectedSeats);
    localStorage.setItem('selectedSeats', JSON.stringify("ab'"));
  };


  return (
    <div className="container mx-auto">
      <div className="stalls flex items-center flex-col gap-2">
        {Array.from({ length: numStallsRows }).map((_, rowIndex) => (
          <div className="flex xl:gap-2 lg:gap-2 md:gap-2 flex-wrap">
          {Array.from({ length: numStallsCols }).map((_, index) => (
            <Seat
              key={`${rowIndex + 1}-${index}`}
              isAvailable={true} 
              isSelected={false} 
              onClick={() => onSeatClick(rowIndex, index)}
            />
          ))}
        </div>
        ))}
      </div>
      <div className="balcony flex items-center flex-col gap-2 mt-4">
      {Array.from({ length: numBalconyRows }).map((_, rowIndex) => (
      <div className="flex xl:gap-2 lg:gap-2 md:gap-2 flex-wrap">
          {Array.from({ length: numBalconyCols }).map((_, index) => (
            <Seat
              key={`${rowIndex + 1}-${index}`}
              isAvailable={true} 
              isSelected={false} 
              onClick={() => onSeatClick(rowIndex, index)}
            />
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default CinemaLayout;
