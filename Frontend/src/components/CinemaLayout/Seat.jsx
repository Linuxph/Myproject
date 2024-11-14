import React, { useState } from "react";
import { MdEventSeat } from "react-icons/md";

const Seat = () => {
  const [variable, setvariable] = useState(false);

  return (
    <div>
      <div
        onClick={() => setvariable(true)}
        onDoubleClick={() => setvariable(false)}
        className={`xl:w-[50px] xl:h-[50px]  md:w-[40px] md:h-[40px]   w-[15px] h-[15px] ${
          variable && "bg-blue-900"
        } bg-white border-white border-2 rounded-lg`}
      />
    </div>
  );
};

export default Seat;
