import React, {  useState, useEffect } from "react";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { Star } from "lucide-react";



const categories = ["All", "Action", "Drama", "Sci-Fi", "Animation", "Thriller", "Comedy"]

const Home = () => {
  const [movies, setmovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const featuredMovies = movies.filter((movie) => movie.featured)
  
  const filteredMovies = movies.filter((movie) => {
    const matchesCategory = selectedCategory === "All" || movie.genre === selectedCategory
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // ➊ Fetch once
useEffect(() => {
  let isMounted = true;
  const abort = new AbortController();

  (async () => {
    try {
      const res = await fetch("/api/v1/home", {
        method: "GET",
      });          
      const data = await res.json();              
      setmovies( data.movies ?? []);
    } catch (err) {
      toast.error(`Could not load movies: ${err.message}`);
    }
  })();

  return () => {
    isMounted = false;
    abort.abort();       // cancel the request if the component unmounts
  };
}, []);

// ➋ Carousel that re-starts every time featuredMovies changes
useEffect(() => {
  if (!movies.length) return;     // nothing to slide through yet

  const id = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % movies.length);
  }, 5000);

  return () => clearInterval(id);         // clean up on unmount or when length changes
}, [movies]);


  

  


  const navigate = useNavigate();

  const handleClick = async (itemId) => {
    if (window.innerWidth > 640) {
      setSelectedId(itemId === selectedId ? null : itemId);
    }

    // try {
    //   const response = await fetch(
    //     `http://localhost:3000/api/v1/rating/${userId}/${itemId}`,
    //     {
    //       method: "GET",
    //       headers: { Authorization: `Bearer ${usertoken}` },
    //     }
    //   );
    //   const data = await response.json();
    //   setrating(data.ratingValue);
    // } catch (error) {
    //   console.error("Error fetching movies:", error);
    // }
  };

  const clickHandler = (movieId) => {
    localStorage.setItem("movieId",movieId);
    return navigate('/movie/' + movieId);
  };

  // const [rating, setrating] = useState(0);
  // const [maxrating, setmaxrating] = useState(5);
  // const [rated, setrated] = useState(0);
  // const handleRating = (index) => {
  //   if(rating > 0){
  //     setrated(index+1);
  //   }
  // }
  return (
    <>
      <div className="  w-full h-screen md:block  ">
        <Navbar />

        {/* Hero Section */}
      <section className="relative h-screen overflow-hidden text-white ">
        <div className="absolute inset-0">
          <img
            src={movies[currentSlide]?.ImageURL || "/placeholder.svg?height=600&width=1200"}
            alt={movies[currentSlide]?.title || "Featured Movie"}
            
            className="object-cover w-full h-full opacity-70 md:opacity-100 transition-opacity duration-500"
            
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">{movies[currentSlide]?.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <Badge variant="secondary" className="bg-red-600 text-white p-1">
                {movies[currentSlide]?.genre}
              </Badge>
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                {movies[currentSlide]?.rating}
              </span>
              <span>{movies[currentSlide]?.release_date.split("T")[0]}</span>
              <span>{movies[currentSlide]?.duration}</span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">{movies[currentSlide]?.description}</p>
            {/* <div className="flex space-x-4">
              <Link href={`/movie/${movies[currentSlide]?._id}`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                More Info
              </Button>
            </div> */}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-red-600" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 bg-black">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredMovies.map((movie) => (
            
              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
                onClick={() => clickHandler(movie._id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={movie.ImageURL || "/placeholder.svg"}
                      alt={movie.title}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 bg-black/80 rounded-full px-2 py-1 text-xs flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      {movie.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                      <span>{movie.genre}</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
           
          ))}
        </div>
      </section>

       
      </div>
    </>
  );
};
export default Home;