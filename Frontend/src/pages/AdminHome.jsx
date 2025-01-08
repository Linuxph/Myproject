import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminPanel from "../components/AdminPanel";

const AdminHome = () => {
  const [remove, setremove] = useState("");
  const [showremove, setshowremove] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setformData] = useState({
    title: "",
    description: "",
    rating: 0,
    release_date: "",
    ImageURL: "",
    duration: "",
    genre: "",
  });

  const [showtime, setshowtime] = useState({
    movieId: "",
    startTime: 0,
    endTime: 0,
    price: 0,
    bookedSeats: [],
  });

  let movieForm = [
    ["Title", "text", "title", "title"],
    ["Description", "text", "description", "description"],
    ["Release Date", "date", "release date", "release_date"],
    ["Duration", "text", "duration", "duration"],
    ["Genre", "text", "genres", "genre"],
  ];

  let showtimeFrom = [
    ["Title", "text", "title", "movieId"],
    ["startTime", "time", "startTime", "startTime"],
    ["endTime", "time", "endTime", "endTime"],
    ["price", "number", "price", "price"],
    ["date", "Date", "date", "date"],
  ];

  let deletemovieFrom = [["Title", "text", "title", "Title"]];

  let deleteShowtimeFrom = [["Title", "text", "title", "Title"]];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeforshowtime = (e) => {
    const { name, value } = e.target;
    setshowtime((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    formData["ImageURL"] = previewUrl;

  }

  const submitFunction = async (e) => {
    e.preventDefault();

    const formData1 = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formData1.append(key, value);
    });
    formData1.append('image', selectedFile);
    console.log(formData1);

    try {
      await fetch("/api/v1/add", {
        method: "POST",
        headers: {
          Authorization:`Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formData1,
      })
        // }
        // try {
        // await fetch("/api/v1/add", {
        //   method: "POST",
        //     crossDomain: true,
        //     headers: {
        //       "Content-Type":"application/json",
        //       Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        //     },
        //     body: JSON.stringify(formData),
        // })
        .then((res) =>
          res.json().then((data) => {
            if (data.msg.includes("successfully")) {
              toast.success(data.msg);
            } else {
              toast.error(data.msg);
            }
          })
        );
    } catch (error) {
      toast.error(error);
    }
  };

  const showTime_Submit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/showtime", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(showtime),
      }).then((res) =>
        res.json().then((data) => {
          if (data.msg.includes("successfully")) {
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const removeFunction = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/v1/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ remove }),
      }).then((res) =>
        res.json().then((data) => {
          if (data.data.deletedCount == 0) {
            toast.error(
              "The movie can't be removed, please enter the valid movie name."
            );
          } else {
            toast.success(`${data.msg}`);
          }
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const removeShowtime = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/v1/deleteShowtime`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ showremove }),
      }).then((res) =>
        res.json().then((data) => {
          if (data.msg.includes("deleted")) {
            toast.error("The Showtime is already deleted");
          }

          if (data.data.deletedCount == 0) {
            toast.error(
              "The showtime can't be removed, please enter the valid movie name."
            );
          } else {
            toast.success(`${data.msg}`);
          }
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full ">
      <div className="pl-[10%]">
        <div>
          <h1 className="font-bold text-5xl mb-10 ">What's task today?</h1>
        </div>

        {/* Add movie */}
        <AdminPanel
          data={formData}
          array={movieForm}
          storeFunc={handleInputChange}
          buttFunc={submitFunction}
          buttonName={"Add Movie"}
          image={true}
          imageFunc={handleImage}
        />
        {/* <div
          onClick={() => {
            setenable(true);
            setcolor(true);
            setenable2(false);
            setcolor2(false);
            setdl(false);
            setdlS(false);
          }}
          className="w-3/4 bg-green-300 rounded-2xl cursor-pointer p-2 mt-10 mb-10"

        >
          <h1
            className={`cursor-pointer p-1 w-fit ${
              color && "bg-green-500 text-white font-bold"
            } rounded-xl hover:font-bold hover:bg-green-500 hover:text-white`}
          >
            Add Movie
          </h1>
          <motion.div
            className={` ${
              enable ? "block" : "hidden"
            }  bg-black md:w-fit md:p-4 mt-2 rounded-2xl`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setenable(false);
                setcolor(false);
              }}
              className="md:text-2xl text-lg text-white font-semibold p-2"
            >
              X
            </button>
            <div className="ml-5 md:ml-10 h-[45vh] md:h-[35vh] w-[30vw]">
              <form>
                {movieForm.map(([label, type, placeholder, name], key) => {
                  return (
                    <div className="md:p-2 p-1 md:text-xl  text-md" key={key}>
                      <label className="text-white">{label}:</label>
                      <input
                        className="border-2 border-black "
                        type={type}
                        placeholder={`Enter the ${placeholder} of the movie`}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  );
                })}
                <div className="p-2 md:text-xl text-white">
                  <label>Image: </label>
                  <input type="file" accept="image/*"  onChange={convertToBase64} required />

                </div>
                <button className="hover:bg-green-800 rounded-xl p-1 text-white" type="submit" onClick={submitFunction} >ADD</button>
              </form>
            </div>
            </motion.div>
        </div>  */}

        {/* Add showtime */}
        <AdminPanel
          data={showtime}
          array={showtimeFrom}
          storeFunc={handleInputChangeforshowtime}
          buttFunc={showTime_Submit}
          buttonName={"Add Showtime"}
        />
        {/* <div
          onClick={() => {
            setcolor2(true);
            setenable2(true);
            setenable(false);
            setcolor(false);
            setdl(false);
            setdlS(false);
          }}
          className="w-3/4 bg-green-300 rounded-2xl cursor-pointer mt-10 mb-10 p-2"
        >
          <h1
            className={`cursor-pointer ${
              color2 && "bg-green-500 text-white font-bold"
            } p-1 w-fit rounded-xl hover:font-bold hover:bg-green-500 hover:text-white`}
          >
            Add Showtime
          </h1>
          <div
            className={`${
              enable2 ? "block" : "hidden"
            } bg-black md:w-fit md:p-4 p-2 mt-2 rounded-2xl`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setenable2(false);
                setcolor2(false);
              }}
              className="md:text-2xl text-lg text-white font-semibold md:p-2 p-1"
            >
              X
            </button>
            <div className="ml-5  md:ml-10">
              <form>
                {showtimeFrom.map(([label, type, placeholder, name], key) => {
                  return (
                    <div className="md:p-2 p-1 md:text-xl text-md " key={key}>
                      <label className="text-white">{label}:</label>
                      <input
                        className="border-2 border-black "
                        type={type}
                        placeholder={`Enter the ${placeholder} of the movie`}
                        name={name}
                        value={showtime[name]}
                        onChange={handleInputChangeforshowtime}
                        required
                      />
                    </div>
                  );
                })}
                <button className="hover:bg-green-800 rounded-xl p-1 text-white" type="submit" onClick={showTime_Submit}>ADD</button>
              </form>
            </div>
          </div>
        </div> */}

        {/* Delete movie */}
        <AdminPanel
          data={remove}
          array={deletemovieFrom}
          storeFunc={(e) => {
            setremove(e.target.value);
          }}
          buttFunc={removeFunction}
          buttonName={"Delete Movie"}
        />
        {/* <div className="p-2 bg-green-300 w-3/4 rounded-2xl">
        <button className="hover:bg-green-500 rounded-2xl hover:text-white hover:font-bold p-1" onClick={()=>
        { setdl(true);
          setenable(false);
          setcolor(false);
          setenable2(false);
          setcolor2(false);
          setdlS(false);
        }}>Delete Movie</button>
        <div className={`${dl ? 'block' : 'hidden'} bg-black rounded-2xl p-1`} >

        <div className="text-xl cursor-pointer text-white" onClick={() => {setdl(false);}}>X</div>

        <div className={`p-2`}>
          <form>
            <label className="text-white">Title: </label>
            <input type="text" onChange={(e)=>{setremove(e.target.value)}} value={remove} name={Title} />
            <button onClick={removeFunction} className="bg-green-800 p-1 rounded-2xl m-1">Remove</button>
          </form>
        </div>      
        </div>
        </div> */}

        {/* Delete showtime */}
        <AdminPanel
          data={showremove}
          array={deleteShowtimeFrom}
          storeFunc={(e) => {
            setshowremove(e.target.value);
          }}
          buttFunc={removeShowtime}
          buttonName={"Delete Showtime"}
        />
        {/* <div className="p-2 bg-green-300 w-3/4 rounded-2xl mt-10">
        <button className="hover:bg-green-500 rounded-2xl hover:text-white hover:font-bold p-1" onClick={()=>
        { 
          setdlS(true);
          setdl(false);
          setenable(false);
          setcolor(false);
          setenable2(false);
          setcolor2(false);
        }}>Delete Showtime</button>
        <div className={`${dlS ? 'block' : 'hidden'} bg-black rounded-2xl p-1`} >

        <div className="text-xl cursor-pointer text-white" onClick={() => {setdlS(false);}}>X</div>

        <div className={`p-2`}>
          <form>
            <label className="text-white">Title: </label>
            <input type="text" onChange={(e)=>{setshowremove(e.target.value)}} value={showremove} name={Title} />
            <button onClick={removeShowtime} className="bg-green-800 p-1 rounded-2xl m-1">Remove</button>
          </form>
        </div>      
        </div>
        </div> */}
      </div>
    </div>
  );
};
export default AdminHome;
