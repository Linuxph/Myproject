import React from 'react';
import Seat from './Seat';

const Row = ({ row, seatsPerRow, onSeatClick }) => {
  return (
    <div className="flex xl:gap-2 lg:gap-2 md:gap-2 flex-wrap">
      {Array.from({ length: seatsPerRow }).map((_, index) => (
        <Seat
          key={`${row}-${index}`}
          isAvailable={true} 
          isSelected={false} 
          onClick={() => onSeatClick(row, index)}
        />
      ))}
    </div>
  );
};

export default Row;
