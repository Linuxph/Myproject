import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { Separator } from "../../ui/Separator";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Checkbox } from "../../ui/checkbox";
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, Users, MapPin, Clock } from "lucide-react";
import { toast } from "react-toastify";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // State for managing fetched data and UI
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Form state, will be pre-filled from fetched data
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        upiId: "",
    });

    // Get seat info from URL, passed from the previous page
    const selectedSeatsFromUrl = searchParams.get("seats")?.split(",") || [];
    const totalAmount = Number.parseInt(searchParams.get("total") || "0");

    useEffect(() => {
        const fetchBookingData = async () => {
            const userId = localStorage.getItem("userId");
            const showtimeId = localStorage.getItem("Showtime");

            if (!userId || !showtimeId) {
                toast.error("Session expired or invalid. Please start over.");
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`/api/v1/booking/${userId}/${showtimeId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Could not fetch booking details.");
                }
                const data = await response.json();
                console.log(data);

                // Correction: The backend seems to have a typo, fetching movie with showtimeId.movie
                // I will assume the movie data is nested inside the showtime object `data.Data.movie`
                const showtimeData = data.showtime;
                const movieData = data.movieData;
                const userData = data.user;

                // Combine fetched data into one object for easier state management
                const details = {
                    showtime: showtimeData,
                    movie: movieData,
                    user: userData,
                    seats: data.seatsId // These are the detailed seat objects
                };

                setBookingDetails(details);

                // Pre-fill form with user data
                setFormData(prev => ({
                    ...prev,
                    name: details.user.name || "",
                    email: details.user.email || "",
                }));

            } catch (error) {
                toast.error(error.message);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [navigate]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBooking = () => {
        // --- Form Validation ---
        if (!agreedToTerms) {
            toast.error("You must agree to the Terms and Conditions.");
            return;
        }
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill in all contact information.");
            return;
        }

        // TODO: Add your payment processing logic here.
        // This could involve calling a payment gateway API (Stripe, Razorpay, etc.)
        // and then on success, calling your own backend to finalize the booking.
        
        console.log("Booking Payload:", {
            userId: bookingDetails.user._id,
            showtimeId: bookingDetails.showtime._id,
            seats: bookingDetails.seats.map(s => s._id),
            totalAmount,
            paymentMethod,
            paymentDetails: formData,
        });

        // Simulate successful booking and redirect
        toast.success("Booking successful!");
        navigate("/confirmation"); // Navigate to the confirmation page
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading booking details...</div>;
    }

    if (!bookingDetails) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Could not load booking details. Please try again.</div>;
    }
    
    // Calculate ticket price from fetched data
    const pricePerTicket = bookingDetails.showtime.price || 0;
    const convenienceFee = Math.round(selectedSeatsFromUrl.length * pricePerTicket * 0.1);

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/booking" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Seats
                        </Link>
                        <Link to="/" className="text-2xl font-bold text-red-600">CinemaFlix</Link>
                        <div className="text-sm text-gray-400">Step 2 of 2</div>
                    </div>
                </div>
            </header>

            <div className="pt-20 container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
                        <p className="text-gray-400">Confirm your details and choose a payment method</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Booking Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Information Card */}
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label >Full Name</Label>
                                            <Input name="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="bg-gray-800 border-gray-700" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label >Email Address</Label>
                                            <Input name="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="bg-gray-800 border-gray-700" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label >Phone Number</Label>
                                        <Input name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="bg-gray-800 border-gray-700" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method Card */}
                            {/* <Card className="bg-gray-900 border-gray-800">
                               <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                               <CardContent>
                                   <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                                       {/* Card Option 
                                       <Label htmlFor="card" className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                           <RadioGroupItem value="card" id="card" />
                                           <CreditCard className="w-5 h-5 text-gray-400" />
                                           <span className="flex-1">Credit/Debit Card</span>
                                       </Label>
                                       {/* UPI Option 
                                       <Label htmlFor="upi" className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                           <RadioGroupItem value="upi" id="upi" />
                                           <Smartphone className="w-5 h-5 text-gray-400" />
                                           <span className="flex-1">UPI Payment</span>
                                       </Label>
                                       {/* Wallet Option 
                                       <Label htmlFor="wallet" className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                           <RadioGroupItem value="wallet" id="wallet" />
                                           <Wallet className="w-5 h-5 text-gray-400" />
                                           <span className="flex-1">Digital Wallet</span>
                                       </Label>
                                   </RadioGroup>

                                   {/* Payment Details 
                                   <div className="mt-6">
                                       paymentMethod === "card" && ( /* Card Details Form 
                                       paymentMethod === "upi" && ( /* UPI Details Form 
                                   </div>
                               </CardContent>
                            </Card> */}

                            {/* Terms and Conditions */}
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                                <Label htmlFor="terms" className="text-sm text-gray-400">
                                    I agree to the <Link to="#" className="text-red-500 hover:text-red-400">Terms and Conditions</Link>
                                </Label>
                            </div>
                        </div>

                        {/* Booking Summary Card */}
                        <div>
                            <Card className="bg-gray-900 border-gray-800 sticky top-24">
                                <CardHeader><CardTitle>Booking Summary</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">{bookingDetails.movie.title}</h3>
                                        <div className="text-sm text-gray-400 space-y-1">
                                            {/* <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{bookingDetails.showtime.theater.name}</div> */}
                                            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{new Date(bookingDetails.showtime.startTime).toLocaleString()}</div>
                                            {/* <p>Screen {bookingDetails.showtime.screen.screenNumber}</p> */}
                                        </div>
                                    </div>
                                    <Separator className="bg-gray-700" />
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="flex items-center"><Users className="w-4 h-4 mr-2" />Selected Seats</span>
                                            <span className="text-red-500 font-semibold">{selectedSeatsFromUrl.length}</span>
                                        </div>
                                        <div className="text-sm text-gray-400 break-words">{selectedSeatsFromUrl.join(", ")}</div>
                                    </div>
                                    <Separator className="bg-gray-700" />
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Tickets ({selectedSeatsFromUrl.length})</span>
                                            <span>₹{selectedSeatsFromUrl.length * pricePerTicket}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Convenience Fee</span>
                                            <span>₹{convenienceFee}</span>
                                        </div>
                                        {/* You can add other charges like GST here if needed */}
                                        <Separator className="bg-gray-700" />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total Amount</span>
                                            <span>₹{totalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
                                        <Shield className="w-4 h-4 mr-2 text-green-500" />
                                        Your payment is secured with 256-bit SSL encryption
                                    </div>
                                    <Button onClick={handleBooking} className="w-full bg-red-600 hover:bg-red-700 text-white py-3" size="lg">
                                        Pay ₹{totalAmount}
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