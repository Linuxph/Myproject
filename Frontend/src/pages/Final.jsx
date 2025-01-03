import React, { useEffect, useState } from "react";
// import Ticket from '/imageTicket.jpg'

import { toast } from "react-toastify";
const Final = () => {
  const [data1, setdata1] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [no, setno] = useState("");
  const [price, setprice] = useState(0);
  const [confirm, setconfirm] = useState(false)
  const [user, setuser] = useState({})

  const [check, setcheck] = useState(false);


  useEffect(() => {
    const getBookedSeatData = async () => {
      try {
        const dataForSeat = await fetch(
          `http://localhost:3000/api/v1/booking/${localStorage.getItem(
            "userId"
          )}/${localStorage.getItem("Showtime")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );

        if (!dataForSeat) {
          toast.error("Something went wrong please try again");
        }
        const data = await dataForSeat.json();

        setdata1(data.seatsId || []);
        setname(data.user.name);
        setemail(data.user.email);
        setno(data.user.phone_no);
        setprice(data.Data.price);
        setuser(data.user);

        toast.success("Please complete the booking by clicking on the button");
      } catch (error) {
        toast.error(error);
      }
    };

    getBookedSeatData();
  }, []);

  const clickhandler = async () => {

    if (check !== true) {
      toast.error("please agree first");
    }
    else {
      try {
        const book = await fetch("/api/v1/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
          body: JSON.stringify({user,data1})
          
        });

        toast.success('Successfully booked the tickets');
        setTimeout(()=>setconfirm(true), 2000);
        setcheck(false);

      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="w-full fixed ">
      <div className={`bg-black/40 w-full h-screen z-[999] backdrop-blur-sm absolute ${confirm ? 'block' : 'hidden'}`}>
        <button className="text-white font-semibold text-2xl absolute right-0 p-2" onClick={()=>{setconfirm(false)}}>X</button>
        <div>Tickets show</div>
        {/* <img src={Ticket} alt="image"/> */}
        <div className="text-3xl"><h1><strong>The confirmation mail has been sent.<br /> to {email}</strong></h1></div>
        
      </div>
      <div className="border-black border-2 m-5 md:w-1/2  mt-[12%] md:ml-[25%] rounded-2xl bg-white shadow-xl p-5 ">
        <div className="flex gap-1">
          <h1 className="text-xl font-bold">Your seats:</h1>{" "}
          <h1 className="text-lg "> {data1.length}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <h1 className="pr-2 text-xl font-bold">Seats:</h1>
          {data1.map((seat, index) => {
            return (
              <div
                key={index}
                className="flex justify-between  text-center border-2 border-black p-1 "
                onClick={() => {}}
              >
                <h1>{`${seat.row} - ${seat.column}`}</h1>
                {/* <button className='bg-red-500 font-bold text-white h-[25px] w-[20px]'>X</button> */}
              </div>
            );
          })}
        </div>
        <hr className="bg-black mt-2 mb-2" />
        <div>
          <div className="flex gap-1">
            <h1 className="font-bold text-xl">Username:</h1>
            <h1 className="text-lg">{name}</h1>
          </div>
          <div className="flex gap-1">
            <h1 className="font-bold text-xl">E-mail:</h1>
            <h1 className="text-lg">{email}</h1>
          </div>
          <div className="flex gap-1">
            <h1 className="font-bold text-xl">Mobile no:</h1>
            <h1 className="text-lg">{no}</h1>
          </div>
          <div className="flex gap-1">
            <h1 className="font-bold text-xl">Price to be paid:</h1>
            <h1 className="text-lg font-semibold">
              {(price * data1.length).toLocaleString()}
            </h1>
          </div>
          <div className="flex align-center gap-2 mt-5">
            <input
              type="checkbox"
              value={check}
              onChange={() => {
                setcheck(true);
              }}
            />
            <h1 className="font-bold ">
              I confirm that ,I am going to book this tickets and they are
              non-refundable.
            </h1>
          </div>
        </div>
      </div>
      <button
        className="bg-black text-white p-3 rounded-3xl ml-[35%] md:ml-[45%] mt-10 font-bold hover:bg-green-500"
        onClick={clickhandler}
      >
        Book Tickets
      </button>
    </div>
  );
};

export default Final;
