import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { Separator } from "../../ui/Separator";
import { ArrowLeft, Users, Eye } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This is the base layout of the theater.
const baseSeatLayout = [
    { row: "A", seats: Array.from({ length: 15 }, (_, i) => ({ number: i + 1 })) },
    { row: "B", seats: Array.from({ length: 15 }, (_, i) => ({ number: i + 1 })) },
    { row: "C", seats: Array.from({ length: 15 }, (_, i) => ({ number: i + 1 })) },
    { row: "D", seats: Array.from({ length: 15 }, (_, i) => ({ number: i + 1 })) },
    { row: "E", seats: Array.from({ length: 15 }, (_, i) => ({ number: i + 1 })) },
    { row: "F", seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1 })) },
    { row: "G", seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1 })) },
    { row: "H", seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1 })) },
    { row: "I", seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1 })) },
    { row: "J", seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1 })) },
];

export default function BookingPage() {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null); 
    const [seatLayout, setSeatLayout] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [apiAvailableSeats, setApiAvailableSeats] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const showtimeId = localStorage.getItem("Showtime");
                if (!showtimeId) {
                    toast.error("Showtime not found. Please select a movie and showtime again.");
                    navigate("/");
                    return;
                }

                const response = await fetch(`/api/v1/booking/seats/${showtimeId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch seat data.");
                }

                const data = await response.json();
                
                console.log("Fetched movie data:", data); 

                setMovieData(data.showtime);
                const seatsfromapi = data.availableSeats || [];
                setApiAvailableSeats(data.availableSeats || []);

                const availableSeatIds = new Set(
                    seatsfromapi.map(seat => `${seat.row}-${seat.column}`) || []
                );

                const initialLayout = baseSeatLayout.map(row => ({
                    ...row,
                    seats: row.seats.map(seat => ({
                        ...seat,
                        status: availableSeatIds.has(`${row.row}-${seat.number}`) ? "available" : "occupied",
                    })),
                }));

                setSeatLayout(initialLayout);
            } catch (error) {
                toast.error( error.message || "Error fetching movie data.");
                console.error("Error fetching movie data:", error);
                if(error.code === 401) {
                    toast.warning("Please log in to continue.");
                    navigate("/auth");
                }
                navigate("/");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [navigate]);

    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleSeatClick = (row, seatNumber, status) => {
        if (status === "occupied") return;
        if (!localStorage.getItem("usertoken")) {
            setShowAuthModal(true);
            return;
        }

        const displayId = `${row}-${seatNumber}`;
        const isSelected = selectedSeats.some(seat => seat.displayId === displayId);

        if (isSelected) {
            setSelectedSeats(prev => prev.filter(seat => seat.displayId !== displayId));
        } else {
            const seatFromApi = apiAvailableSeats.find(s => s.row === row && s.column === seatNumber);
            if (seatFromApi) {
                setSelectedSeats(prev => [...prev, { displayId, dbId: seatFromApi._id }]);
            } else {
                console.error("Critical error: Clicked seat not found in available seats list.");
                toast.error("An unexpected error occurred. Please refresh.");
            }
        }
    };

    const handleProceedToPayment = async () => {
        if (selectedSeats.length === 0) {
            toast.error("Please select at least one seat.");
            return;
        }

        const showtimeId = localStorage.getItem("Showtime");
        const userId = localStorage.getItem("userId");
        const selectedDbIds = selectedSeats.map(seat => seat.dbId);

        console.log(selectedDbIds, "Selected DB IDs for booking");
        try {
            const response = await fetch(`/api/v1/booking/seats/${showtimeId}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                },
                body: JSON.stringify({ SelectedSeatIds: selectedDbIds }),
            });
            
            const data = await response.json();

            console.log("Booking response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to hold seats.");
            }

            toast.success("Seats held successfully! Proceeding to payment.");
            
            const seatNames = selectedSeats.map(s => s.displayId.replace("-", "")).join(',');
            const total = totalPrice + Math.round(totalPrice * 0.1);
            
            // This navigation should now work, assuming your /checkout route is set up correctly.
            navigate(`/checkout?seats=${seatNames}&total=${total}`);

        } catch (error) {
            toast.error(error.message || "Failed to book seats. Please try again.");
            console.error("Booking error:", error);
        }
    };

    const selectedDisplayIds = new Set(selectedSeats.map(s => s.displayId));
    const totalPrice = selectedSeats.length * (movieData?.price || 0);

    // Show a loading screen until the data is fetched
    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Seats...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {showAuthModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-sm w-full mx-4 text-center">
                        <h2 className="text-xl font-bold text-white mb-2">Sign in Required</h2>
                        <p className="text-gray-400 mb-6">You need to sign in or create an account to select seats.</p>
                        <div className="flex gap-3">
                            <Button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => navigate("/auth")}
                            >
                                Sign In / Sign Up
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex-1 border border-gray-600 text-gray-300 hover:text-white"
                                onClick={() => setShowAuthModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to={`/movie/${movieData?.movie}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Movie
                        </Link>
                        <Link to="/" className="text-2xl font-bold text-red-600">MOVIEtIME</Link>
                        <div className="text-sm text-gray-400">Step 1 of 2</div>
                    </div>
                </div>
            </header>

            <div className="pt-20 container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        {/* FIX: Correctly access the nested movie title */}
                        {/* <h1 className="text-3xl font-bold mb-2">{movieData?.movie?.title || 'Loading...'}</h1> */}
                        <div className="flex items-center justify-center space-x-4 text-gray-400">
                            {/* FIX: Use optional chaining for safety */}
                            {/* <span>{movieData?.theater?.name}</span> */}
                            <span>•</span>
                            <span>{new Date(movieData?.startTime).toLocaleDateString()}</span>
                            <span>•</span>
                            {/* <span>Screen {movieData?.screen?.screenNumber}</span> */}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card className="bg-gray-900 border-gray-800">
                                <CardContent>
                                    <div className="space-y-3">
                                        {seatLayout.map((row) => (
                                            <div key={row.row} className="flex items-center justify-center space-x-2">
                                                <div className="w-8 text-center text-gray-400 font-mono">{row.row}</div>
                                                <div className="flex flex-wrap justify-center gap-1">
                                                    {row.seats.map((seat) => {
                                                        const displayId = `${row.row}-${seat.number}`;
                                                        const isSelected = selectedDisplayIds.has(displayId);
                                                        const status = isSelected ? 'selected' : seat.status;
                                                        return (
                                                            <button
                                                                key={seat.number}
                                                                onClick={() => handleSeatClick(row.row, seat.number, seat.status)}
                                                                disabled={seat.status === "occupied"}
                                                                className={`w-8 h-8 rounded-sm text-xs font-mono transition-all duration-200 ${
                                                                    status === "available" ? "bg-gray-600 hover:bg-gray-500 text-white"
                                                                    : status === "selected" ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-500/50"
                                                                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                                                }`}
                                                            >
                                                                {seat.number}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div>
                            <Card className="bg-gray-900 border-gray-800 sticky top-24">
                                <CardHeader><CardTitle>Booking Summary</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        {/* FIX: Correctly access nested movie and theater data */}
                                        {/* <h3 className="font-semibold mb-2">{movieData?.movie?.title || 'N/A'}</h3> */}
                                        <div className="text-sm text-gray-400 space-y-1">
                                            {/* <p>{movieData?.theater?.name}, {movieData?.theater?.location}</p> */}
                                            <p>{new Date(movieData?.startTime).toLocaleString()}</p>
                                            {/* <p>Screen {movieData?.screen?.screenNumber}</p> */}
                                        </div>
                                    </div>
                                    <Separator className="bg-gray-700" />
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="flex items-center"><Users className="w-4 h-4 mr-2" />Selected Seats</span>
                                            <Badge variant="secondary" className="bg-red-600">{selectedSeats.length}</Badge>
                                        </div>
                                        {selectedSeats.length > 0 && (
                                            <div className="text-sm text-gray-400 break-words">
                                                {selectedSeats.map(s => s.displayId.replace("-", "")).join(", ")}
                                            </div>
                                        )}
                                    </div>
                                    <Separator className="bg-gray-700" />
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Tickets ({selectedSeats.length})</span>
                                            <span>₹{totalPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Convenience Fee</span>
                                            <span>₹{Math.round(totalPrice * 0.1)}</span>
                                        </div>
                                        <Separator className="bg-gray-700" />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleProceedToPayment}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                                        disabled={selectedSeats.length === 0}
                                    >
                                        {selectedSeats.length === 0 ? "Select Seats to Continue" : "Proceed to Payment"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}