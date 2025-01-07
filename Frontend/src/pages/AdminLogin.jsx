import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const AdminLogin = () => {
  const navigat = useNavigate();
  const [first, setfirst] = useState({
    email:"",
    secret:""
  })
  const submitHandlr = async (e) => {
    e.preventDefault();
  
        const response = await fetch('/api/v1/adminLogin', {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(first)
        })
        const result = await  response.json();
          const token = result.token;
          if(token){
            toast.success("Login successful");
            localStorage.setItem("adminToken",token);
            localStorage.setItem("logout",true);
            navigat('/adminHome')
          }  
          else{
            toast.error(result.msg || 'Something went wrong please try again later.',{
              position: "top-center"
            });
          }
  }
  return (
    <div className="flex items-center justify-center h-[80vh] w-full px-5 sm:px-0">
      <div className="flex justify-center bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome Admin!</p>
            <form onSubmit={submitHandlr} method='post'>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              name='email'
              value={first.email}
              onChange={(e) => 
                setfirst({
                  ...first,
                  email : e.target.value
                })
              }  
              required
              />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Secret
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              name='secret'
              value={first.secret}
              onChange={(e) => 
                setfirst({
                  ...first,
                  secret : e.target.value
                })
              }                   
              />
              {/* <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                Resend OTP?
              </a> */}
          </div>
          <div className="mt-8">
            <button 
            type='submit'
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          
            </form>
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to="/"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Oops only exploring, go back?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  
  )
}
export default AdminLogin