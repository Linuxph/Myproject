import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { Button } from "../../ui/Button"
import { Badge } from "../../ui/Badge"
import { Card, CardContent } from "../../ui/Card"
import { Separator } from "../../ui/Separator"
import { ArrowLeft, Play, Star, Clock, MapPin, Share, Heart } from "lucide-react"
import { toast } from "react-toastify"



export default function MoviePage() {
  const [selectedShowtime, setSelectedShowtime] = useState(null)

  const [dataShowtimes, setdataShowtimes] = useState([]);
  const [movieData, setmovieData] = useState();
  
  useEffect(() => {
    const showtimeDetailsFetch = async () => {
      try {
        const response = await fetch(
          `/api/v1/movie/${localStorage.getItem("movieId")}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setdataShowtimes(data.showtimes ?? []);
        setmovieData(data.movieData[0] || []);

        for (let showtime of data.showtimes) {
          localStorage.setItem("Showtime", showtime._id);
        }
      } catch (error) {
        toast.error("Error fetching movies:", error);
      }
    };
    showtimeDetailsFetch();
  }, []);

  const handleClick = () => {
    if(!localStorage.getItem("userId") === null || !localStorage.getItem("userId") === undefined || localStorage.getItem("login") === "true") {
      window.location.href = `/booking/${dataShowtimes[selectedShowtime]._id}`;
    }else{
      toast.error("Please login to book tickets");
      window.location.href = "/auth";
    }
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => localStorage.removeItem(localStorage.getItem("movieId"))} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link href="/" className="text-2xl font-bold text-red-600">
              MOVIEtIME
            </Link>
            {/* <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Share className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movieData?.ImageURL || "/placeholder.svg"}
            alt={movieData?.title || "Loding..."}
            
            className="object-cover w-full h-full opacity-70 md:opacity-100 transition-opacity duration-500 rounded-b-lg shadow-lg"
            
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">{movieData?.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    {movieData?.genre}
                  </Badge>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {movieData?.rating}/5.0
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {movieData?.Duration}
                  </span>
                  {/* <span>{movieData.year}</span>
                  <span>{movieData.language}</span> */}
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">{movieData?.description}</p>

              <div className="space-y-2">
                <p>
                  {/* <span className="text-gray-400">Director:</span> {movieData.director} */}
                </p>
                <p>
                  {/* <span className="text-gray-400">Cast:</span> {movieData.cast.join(", ")} */}
                </p>
              </div>

              {/* <div className="flex space-x-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Add to Watchlist
                </Button>
              </div> */}
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <img
                  src={movieData?.ImageURL || "/placeholder.svg"}
                  alt={movieData?.title}
                  width={400}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showtimes Section */}
      <section className="container mx-auto px-4 py-16 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book Your Tickets</h2>
            <p className="text-gray-400">Select your preferred showtime and theater</p>
          </div>

          <div className="grid gap-6">
            {dataShowtimes.map((showtime, index) => (
              <Card
                key={index}
                className={`bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
                  selectedShowtime === index ? "ring-2 ring-red-600 bg-gray-800" : ""
                }`}
                onClick={() => setSelectedShowtime(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{showtime.time}</div>
                        <div className="text-sm text-gray-400">Today</div>
                      </div>
                      <Separator orientation="vertical" className="h-12 bg-gray-700" />
                      <div>
                        <div className="flex items-center text-white mb-1">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {showtime.theater}
                        </div>
                        <div className="text-sm text-gray-400">Screen 1 • Dolby Atmos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">₹{showtime.price}</div>
                      <div className="text-sm text-gray-400">per ticket</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedShowtime !== null && (
            <div className="mt-8 text-center">
              {/* <Link to={`/booking/${dataShowtimes[selectedShowtime]._id}`}> */}
                <Button onClick={handleClick} size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12">
                  Select Seats
                </Button>
              {/* </Link> */}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
