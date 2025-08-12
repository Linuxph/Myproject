import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { Separator } from "../../ui/Separator";
import { toast } from "react-toastify";
import {
    CheckCircle,
    Download,
    Mail,
    Share2,
    Calendar,
    MapPin,
    Clock,
    Users,
    Ticket,
    QrCode,
    Star,
    Home,
} from "lucide-react";
// html2canvas can be used for the download ticket functionality
// import html2canvas from "html2canvas";

export default function Final() {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailStatus, setEmailStatus] = useState("Sending confirmation email...");
    const [isDownloading, setIsDownloading] = useState(false);
    const ticketRef = useRef(null);

    useEffect(() => {
        const fetchAndConfirm = async () => {
            const userId = localStorage.getItem("userId");
            const showtimeId = localStorage.getItem("Showtime");

            if (!userId || !showtimeId) {
                toast.error("Booking session not found. Redirecting to home.");
                navigate("/");
                return;
            }

            try {
                // 1. Fetch the confirmed booking details
                const response = await fetch(`/api/v1/booking/${userId}/${showtimeId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch booking details. Please contact support.");
                }

                const data = await response.json();
                console.log(data);
                // Structure data for easier use
                const details = {
                    showtime: data.showtime,
                    movie: data.movieData,
                    user: data.user,
                    seats: data.seatsId,
                };
                setBookingDetails(details);

                // 2. Automatically send the confirmation email
                try {
                    const emailResponse = await fetch("/api/v1/booking", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                        },
                        body: JSON.stringify({ user: details.user, data1: details.seats }),
                    });
                    if (!emailResponse.ok) {
                         setEmailStatus("Failed to send email. Please contact support.");
                    } else {
                         setEmailStatus("Confirmation email sent successfully!");
                    }
                } catch (emailError) {
                    console.error("Email sending error:", emailError);
                    setEmailStatus("Failed to send confirmation email.");
                }

            } catch (error) {
                toast.error(error.message);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchAndConfirm();
    }, [navigate]);

    const downloadTicket = async () => {
        // This is a more advanced implementation using a library like html2canvas
        // You would need to install it first: npm install html2canvas
        // For now, we'll keep the simulated download
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            toast.success("Ticket downloaded!");
        }, 1500);
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Finalizing your booking...</div>;
    }

    if (!bookingDetails) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Could not load booking details.</div>;
    }
    
    // Dynamically calculate values from fetched data
    const { movie, showtime, user, seats } = bookingDetails;
    const seatNames = seats.map(s => `${s.row}${s.column}`);
    const totalAmount = (seats.length * showtime.price) + Math.round((seats.length * showtime.price) * 0.1);

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                {/* ... Header remains the same ... */}
            </header>

            <div className="pt-20 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-400 mb-4">
                            Your tickets are ready. Booking ID:{" "}
                            <span className="text-red-500 font-mono">{showtime._id.slice(-12)}</span>
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span>{emailStatus}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {/* ... Action Buttons remain the same ... */}
                    </div>

                    <div ref={ticketRef} className="bg-black p-0 md:p-8">
                        <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700 overflow-hidden">
                            <div className="relative">
                                <div className="bg-red-600 text-white p-4">
                                    {/* ... Ticket Header ... */}
                                </div>
                                <div className="p-6">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2 space-y-6">
                                            <div className="flex items-start space-x-4">
                                                <img src={movie.posterURL || "/placeholder.svg"} alt={movie.title} className="w-20 rounded-lg" />
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                                                        <Badge variant="secondary" className="bg-gray-700 text-white">{movie.genre}</Badge>
                                                        <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1" />{movie.rating}</span>
                                                        <span>{movie.duration}</span>
                                                        <span>{movie.language}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className="bg-gray-700" />
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center text-gray-300">
                                                        <MapPin className="w-5 h-5 mr-3 text-red-500" />
                                                        <div>
                                                            {/* <div className="font-semibold">{showtime.theater.name}</div> */}
                                                            {/* <div className="text-sm text-gray-400">Screen {showtime.screen.screenNumber}</div> */}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-300">
                                                        <Calendar className="w-5 h-5 mr-3 text-red-500" />
                                                        <div>
                                                            <div className="font-semibold">{new Date(showtime.startTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center text-gray-300">
                                                        <Clock className="w-5 h-5 mr-3 text-red-500" />
                                                        <div>
                                                            <div className="font-semibold">{new Date(showtime.startTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-300">
                                                        <Users className="w-5 h-5 mr-3 text-red-500" />
                                                        <div>
                                                            <div className="font-semibold">{seatNames.join(", ")}</div>
                                                            <div className="text-sm text-gray-400">{seats.length} Seat(s)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className="bg-gray-700" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-3">Customer Details</h3>
                                                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                                    <div><span className="text-gray-400">Name:</span><span className="ml-2 text-white">{user.name}</span></div>
                                                    <div><span className="text-gray-400">Email:</span><span className="ml-2 text-white">{user.email}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center space-y-4 border-l border-gray-700 pl-6">
                                            <div className="text-center">
                                                <QrCode className="w-32 h-32 text-white mx-auto" />
                                                <p className="text-xs text-gray-400 mt-2">Scan at theater</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400 mb-1">Booking ID</p>
                                                <p className="font-mono text-lg font-bold text-red-500">{showtime._id.slice(-12)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                                                <p className="text-2xl font-bold text-white">₹{totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
                                    {/* ... Ticket Footer ... */}
                                </div>
                                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
                                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
                            </div>
                        </Card>
                    </div>

                    {/* ... Additional Information & Help sections ... */}

                </div>
            </div>
        </div>
    );
};