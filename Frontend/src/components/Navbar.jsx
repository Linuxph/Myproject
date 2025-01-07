import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "/LOGO.png";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      localStorage.clear();
      navigate('/login');
  } catch (error) {
      toast.error('Failed to log out');
  }
}
  const [menu, setmenu] = useState(false);
  const [toggle, settoggle] = useState(false);
  
  return (
    <div>
      <nav className="xl:flex md:flex lg:flex gap-5 items-center justify-between  p-2 pl-5 bg-black text-white backdrop-sepia-0 hidden rounded-full ">
        <div className="flex gap-5 items-center ">
          <div >
            <Link to="/">
              <img src={Img} alt="LOGO" className="h-[40px]  " />
            </Link>
          </div>
          <div className=" hover:bg-white/40 hover:text-blue-300 bg-black p-2">
            <Link to="/latest">LATEST</Link>
          </div>
          <div className=" hover:bg-white/40 hover:text-blue-300 bg-black p-2">
            <Link to="/rated">RATED</Link>
          </div>
          
        </div>
          { localStorage.getItem("logout") &&
          <div className="rounded-2xl hover:border-2 hover:border-white border-2 border-black p-2 cursor-pointer ">
            <button onClick={(e)=>{
              logoutHandler()
            }}>Logout</button>
          </div>
          }
        
      </nav>
      {/* //bg-[#0F67B1]/40 */}
      <nav className="xl:hidden md:hidden lg:hidden gap-5 items-center p-2 bg-black backdrop-sepia-0 flex justify-between relative z-[999]">
        <div>
          <Link to="/">
            <img src={Img} alt="LOGO" className="h-[4vh] " />
          </Link>
        </div>
        <div>
          <span
            className={`material-symbols-outlined ${
              toggle && `hidden`
            } cursor-pointer bg-white`}
            onClick={() => {
              setmenu(true), settoggle(true);
            }}
          >
            menu
          </span>
        </div>
        <span
          className={`material-symbols-outlined ${
            toggle ? `block` : `hidden`
          } cursor-pointer bg-white`}
          onClick={() => {
            setmenu(false), settoggle(false);
          }}
        >
          close
        </span>
        <div
          className={`menu ${
            menu ? `block` : "hidden"
          } transition ease-in-out delay-150 z-[999] absolute bg-[#000000] m-1 p-2 rounded-3xl right-[0%] top-[95%] w-full h-[28vh]  border-2 border-black` }
        >
          <div className="p-5 active:bg-blue-900 rounded-3xl border-black bg-white border-2">
            <Link to="/latest">LATEST</Link>
          </div>
          <div className="p-5 active:bg-blue-500 rounded-3xl border-black border-2 bg-white">
            <Link to="/rated">RATED</Link>
          </div>
          <div className="p-5 active:bg-red-500 rounded-3xl border-black border-2 bg-white">
            <button onClick={()=>{logoutHandler()}}>LOGOUT</button>
          </div>
        </div>
        {/* { logout && 
        <div
          className={`bg-[#0F67B1] rounded-md p-1 font-bold text-white absolute top-[1600%] w-full  xl:hidden md:hidden lg:hidden flex justify-center`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setlogout(false);
              setusertoken("");
              navigate('/login');
            }}
            style={{ backgroundColor: "red", borderRadius: "8px", padding: 2 }}
          >
            Logout
          </button>
        </div> } */}
      </nav>
    </div>
  );
};
export default Navbar;