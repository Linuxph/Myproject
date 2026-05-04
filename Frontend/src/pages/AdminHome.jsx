import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminPanel from "../components/AdminPanel";

const AdminHome = () => {
  const [remove, setremove] = useState("");
  const [showremove, setshowremove] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setformData] = useState({
    title: "", description: "", rating: 0,
    release_date: "", ImageURL: "", duration: "", genre: "",
  });

  const [showtime, setshowtime] = useState({
    movieId: "", startTime: "", endTime: "", price: 0, date: "",
  });

  const movieForm = [
    ["Title", "text", "title", "title"],
    ["Description", "text", "description", "description"],
    ["Release Date", "date", "release date", "release_date"],
    ["Duration", "text", "duration", "duration"],
    ["Genre", "text", "genres", "genre"],
    ["Rating", "number", "rating (0-10)", "rating"],
  ];

  const showtimeForm = [
    ["Movie Title", "text", "movie title", "movieId"],
    ["Start Time", "time", "start time", "startTime"],
    ["End Time", "time", "end time", "endTime"],
    ["Price", "number", "price", "price"],
    ["Date", "date", "date", "date"],
  ];

  const deletemovieForm = [["Movie Title", "text", "movie title", "remove"]];
  const deleteShowtimeForm = [["Movie Title", "text", "movie title", "showremove"]];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeforshowtime = (e) => {
    const { name, value } = e.target;
    setshowtime((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitFunction = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", selectedFile);
    try {
      const res = await fetch("/api/v1/add", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        body: fd,
      });
      const data = await res.json();
      data.msg?.includes("successfully") ? toast.success(data.msg) : toast.error(data.msg);
    } catch (error) {
      toast.error("Failed to add movie.");
    }
  };

  const showTime_Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/showtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(showtime),
      });
      const data = await res.json();
      data.msg?.includes("successfully") ? toast.success(data.msg) : toast.error(data.msg);
    } catch {
      toast.error("Failed to add showtime.");
    }
  };

  const removeFunction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ remove }),
      });
      if (!res.ok) {
        const err = await res.json();
        return toast.error(err.msg || "Something went wrong!");
      }
      const data = await res.json();
      data.data?.deletedCount === 0
        ? toast.error("Movie not found. Please enter a valid title.")
        : toast.success(data.msg || "Movie removed successfully.");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const removeShowtime = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/deleteShowtime", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ showremove }),
      });
      const data = await res.json();
      if (data.data?.deletedCount === 0) {
        toast.error("Showtime not found. Please enter a valid movie title.");
      } else {
        toast.success(data.msg);
      }
    } catch {
      toast.error("Failed to delete showtime.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur px-4 sm:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Manage movies and showtimes</p>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { label: "Add Movie", icon: "🎬", color: "text-emerald-400" },
            { label: "Add Showtime", icon: "🕐", color: "text-blue-400" },
            { label: "Delete Movie", icon: "🗑️", color: "text-red-400" },
            { label: "Delete Showtime", icon: "❌", color: "text-orange-400" },
          ].map(({ label, icon, color }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl mb-1">{icon}</div>
              <div className={`text-xs font-medium ${color} leading-tight`}>{label}</div>
            </div>
          ))}
        </div>

        {/* Section: Manage Movies */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Movies</h2>
          <AdminPanel
            data={formData}
            array={movieForm}
            storeFunc={handleInputChange}
            buttFunc={submitFunction}
            buttonName="Add Movie"
            image={true}
            imageFunc={handleImage}
          />
          <AdminPanel
            data={remove}
            array={deletemovieForm}
            storeFunc={(e) => setremove(e.target.value)}
            buttFunc={removeFunction}
            buttonName="Delete Movie"
          />
        </div>

        {/* Section: Manage Showtimes */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Showtimes</h2>
          <AdminPanel
            data={showtime}
            array={showtimeForm}
            storeFunc={handleInputChangeforshowtime}
            buttFunc={showTime_Submit}
            buttonName="Add Showtime"
          />
          <AdminPanel
            data={showremove}
            array={deleteShowtimeForm}
            storeFunc={(e) => setshowremove(e.target.value)}
            buttFunc={removeShowtime}
            buttonName="Delete Showtime"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
