import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigat = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    phone_no: "",
    email: "",
    password: "",
  });
  const [errorDiv, seterrorDiv] = useState(false);
  const [errormessage, seterrormessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(" successfully registered!", {
          position: "top-center",
        });
        navigat(`/login`);
      } else {
        toast.error(data.msg || "Registration failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      seterrormessage("There was an error registering!");
      seterrorDiv(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-fit w-full md:h-[80vh] h-screen  fixed px-5 bg-black">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="w-11 h-6 bg-blue-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F67B1]"
            ></div>
          </label>
        </div>
      </div>

      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-[#ffffff]"
        }  w-full p-5 sm:p-10 rounded-md border-2 drop-shadow-2xl`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Register for a free account
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <form
              className=" flex flex-col gap-3"
              action="http//localhost:3000/api/v1/signUp"
              onSubmit={handleSubmit}
              method="post"
            >
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="tel"
                placeholder="Enter your phone"
                name="phone_no"
                value={formData.phone_no}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    phone_no: e.target.value,
                  })
                }
                required
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-[#0F67B1] text-gray-100 w-full py-4 rounded-lg hover:bg-[#0F67B1]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Register</span>
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-[#0F67B1] font-semibold">Login</span>
              </Link>
            </p>
          </div>
          <div
            className={` text-red-500 text-center mt-2 ${
              errorDiv ? "block" : "hidden"
            } rounded-3xl`}
          >
            {" "}
            {errormessage}{" "}
          </div>
        </div>
      </div>
      <div className="p-1 -6 text-xs text-gray-600 text-center">
        <Link to="/adminlogin">Are you looking for the admin login?</Link>
      </div>
    </div>
  );
};

export default SignUp;
