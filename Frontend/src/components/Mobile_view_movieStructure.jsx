import React from "react";
import { useNavigate } from "react-router-dom";

const Mobile_view_movieStructure = ({ movies }) => {
  const navigate = useNavigate();

  const clickHandler = (movieId) => {
    localStorage.setItem("movieId",movieId);
    navigate('/showtime');
  }
  return (
    <div className=" w-full h-screen">
      <div className=" w-full text-white">
          <div className="text-2xl font-bold p-1"> Popular Movies</div>
        <section className="popular-movies w-full overflow-x-auto whitespace-nowrap scroll-smooth ">
          <div className="flex space-x-4 p-4">
            {movies.length > 0 &&
              movies.map((item, index) => {
                return (
                    <div>

                  <div
                    key={index}
                    onClick={() => clickHandler(item._id)}
                    className={`min-w-[325px] h-[200px] bg-gray-800 rounded-lg flex items-center justify-center text-white text-center p-2 shadow-md `}
                    style={{
                        backgroundImage: `url('${item.ImageURL}')`,
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                    <p className="bg-black bg-opacity-50 p-2 rounded-md">
                      {item.title}
                    </p>
                </div>
                );
              })}
          </div>
        </section>
          <div className="text-2xl font-bold p-1 ">Now in Cinemas</div>
        <section className="Now-cinemas w-full overflow-x-auto whitespace-nowrap scroll-smooth">
          <div className="flex space-x-4 p-4">
            {movies.length > 0 &&
              movies.map((movie, index) => {
                return (
                    <div
                        key={index}
                    >
                  <div
                    className={` h-[150px] w-[150px] rounded-xl`}
                    onClick={() => clickHandler(movie._id)}
                    style={{
                      backgroundImage: `url('${movie.ImageURL}')`,
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                    <p className="bg-black bg-opacity-50 p-2 rounded-md">
                      {movie.title}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
          <div className="text-2xl font-bold p-1">Coming soon</div>
        <section className="Now-cinemas w-full overflow-x-auto whitespace-nowrap scroll-smooth">
          <div className="flex space-x-4 p-4">
            {movies.length > 0 &&
              movies.map((movie, index) => {
                return (
                    <div
                        key={index}
                    >
                  <div
                    className={` h-[150px] w-[150px] rounded-xl`}
                    onClick={() => clickHandler(movie._id)}
                    style={{
                      backgroundImage: `url('${movie.ImageURL}')`,
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                    <p className="bg-black bg-opacity-50 p-2 rounded-md">
                      {movie.title}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mobile_view_movieStructure;
