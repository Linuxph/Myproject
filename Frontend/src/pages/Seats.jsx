// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { Armchair } from "lucide-react";

// // const Seats = () => {
// //   const [book, setbook] = useState(false);

// //   const [selectedSeats, setSelectedSeats] = useState([]);

// //   const [seat, setseat] = useState([]);
// //   const [showTime, setshowTime] = useState({});

// //   const [SelectedSeatIds, setSelectedSeatIds] = useState([]);

// //   const allRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const seatdatafetch = async () => {
// //       try {
// //         const response = await fetch(
// //           `/api/v1/booking/seats/${localStorage.getItem("Showtime")}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
// //             },
// //           }
// //         );
// //         const data = await response.json();
// //         setseat(data.availableSeats);
// //         setshowTime(data.showtime || {});
// //         // console.log(data.showtime);
// //         // console.log(showTime);
// //       } catch (error) {
// //         toast.error("Error fetching movies:", error);
// //       }
// //     };
// //     seatdatafetch();
// //   }, []);

// //   const clickHandler = (rowIndex, colIndex) => {
// //     setbook(true);
// //     const seatId = `${rowIndex}-${colIndex}`;

// //     setSelectedSeats((prevSelectedSeats) => {
// //       if (prevSelectedSeats.includes(seatId)) {
// //         return prevSelectedSeats.filter((seat) => seat !== seatId);
// //       } else {
// //         return [...prevSelectedSeats, seatId];
// //       }
// //     });

// //     const seatid = seat.find(
// //       (id) => rowIndex === id.row && colIndex === id.column
// //     )._id;

// //     setSelectedSeatIds((prevSelectedSeatIds) => {
// //       if (prevSelectedSeatIds.includes(seatid)) {
// //         return prevSelectedSeatIds.filter((seat) => seat !== seatid);
// //       } else {
// //         return [...prevSelectedSeatIds, seatid];
// //       }
// //     });
// //   };

// //   const isSelected = (rowIndex, colIndex) => {
// //     return selectedSeats.includes(`${rowIndex}-${colIndex}`);
// //   };

// //   const seatdataUpdate = async () => {
// //     if (selectedSeats.length == 0) {
// //       toast.error("Please select at least one seat.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         `/api/v1/booking/seats/${localStorage.getItem(
// //           "Showtime"
// //         )}/${localStorage.getItem("userId")}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
// //           },
// //           body: JSON.stringify({ SelectedSeatIds: SelectedSeatIds }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (
// //         data.msg === `Unexpected token '"', ""66caea6cb"... is not valid JSON`
// //       ) {
// //         return toast.error("Something went wrong.Try again later.");
// //       } else {
// //         navigate("/final");
// //       }
// //     } catch (error) {
// //       toast.error("Failed to update seat booking.");
// //     }
// //   };

// //   const groupedSeats = seat.reduce((acc, seat) => {
// //     const { row, column } = seat; 
// //     if (!acc[row]) {
// //       acc[row] = [];
// //     }
// //     acc[row].push(seat);
// //     return acc;
// //   }, {});

// //   const sortedRows = Object.keys(groupedSeats)
// //     .sort() 
// //     .map((row) => ({
// //       row,
// //       seats: groupedSeats[row].sort((a, b) => a.column - b.column), 
// //     }));


// //   return (
// //     <div className=" w-full text-white h-screen ">
// //       <div className="md:hidden">
// //       <div className="w-full flex flex-wrap justify-center">
// //         <div className="bg-blue-500 w-24 p-1 rounded-lg text-black text-center ">
            
// //             {/* <h1>{ showTime?.startTime.split("-")[2].split("T")[0] || ""}</h1> */}
// //             {/* <p>{ showTime?.startTime.split("-")[1] || ""}</p> */}
          
// //         </div>
// //       </div>
// //         {/* <div className="text-center">{showTime?.startTime.split(":")[0].split("T")[1] || ""}:{showTime.startTime.split(":")[1]} - {showTime.endTime.split(":")[0].split("T")[1]}:{showTime.endTime.split(":")[1]} </div> */}
// //       </div>
// //         {/* <div className="container mx-auto hidden md:block ">
// //         {/* Stalls Section */}
// //         {/* <div className="stalls border-2 border-black flex flex-wrap justify-center p-2 items-center md:gap-2 gap-5  scale-50 md:scale-100 ">

// //         {allRows.map((row) => {
          
// //           const seats = seat.filter((data) => data.row === row);
          
// //           return (
// //             <div key={row} className="seatContainer flex space-x-2 mb-1 ">
// //               {seats.length > 0  ? (
// //                 seats.map((data, index) => (  
// //                   <div
// //                     key={`${row}-${index}`}
// //                     onClick={() => clickHandler(data.row, data.column)}
// //                     className={`border-white border-2 rounded-lg cursor-pointer md:w-12 md:h-12 w-[5vw] h-[5vh] text-center ${
// //                       isSelected(data.row, data.column) && "bg-blue-300 text-white"
// //                       }`}
// //                       >
// //                       <h1 className={`${window.innerWidth < 640 ? 'hidden' :" block"}`}>
// //                       {data.row}-{data.column}
// //                       </h1>
// //                       </div>
// //                 ))
// //                 ) : (
// //                 <div className="md:w-12 md:h-12 w-6 h-6 border-black border-2 bg-black" /> 
// //               )}

// //             </div>
// //             );
            
// //             })}

// //         </div> 

// //       </div> */}
// //       <div className="w-full p-10">
// //         <div className="w-full bg-white text-black text-center">Screen</div>
// //       </div>
// //       <div className="flex flex-col items-center gap-2 p-4">
// //       {sortedRows.map(({ row, seats }) => (
// //         <div key={row} className="flex gap-2">
// //           <span className="font-bold">{row}</span> {/* Row label */}
// //           {seats.map((seat) => (
            
// //               <Armchair  key={seat._id} 
// //               onClick={() => clickHandler(seat.row, seat.column)}
              
// //               className={`h-3 w-3 md:h-12 md:w-12  ${isSelected(seat.row, seat.column) && "text-blue-500 "}`} />
            
// //           ))}
// //         </div>
// //       ))}
// //     </div>

// //       {/* Display selected seats */}
// //       <div className="md:mt-4 text-white text-center text-sm">
// //         {selectedSeats.length > 0 ? (
// //           <div>
// //             <h3 className="font-semibold md:font-bold md:text-xl">
// //               Selected Seats:
// //             </h3>
// //             <div className="flex justify-center w-full p-2">
// //               {selectedSeats.map((seat) => {
// //                 const [rowIndex, colIndex] = seat.split("-");
// //                 return (
// //                   <div
// //                     key={seat}
// //                     className="p-1 md:p-3 text-white bg-black rounded-full"
// //                   >
// //                     <p>
// //                       {rowIndex}-{parseInt(colIndex)}
// //                     </p>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         ) : (
// //           <p className={`font-semibold md:font-bold  md:text-xl `}>
// //             No seats Available.
// //           </p>
// //         )}
// //       </div>
// //       <div className="w-full flex justify-center mb-4 ">
// //         <button
// //           className={`${
// //             book ? "block" : "hidden"
// //           } bg-blue-700 text-center p-1 text-sm  rounded-3xl`}
// //           onClick={() => seatdataUpdate()}
// //         >
// //           BOOK
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Seats;

// //YAHA SE HE NEW WALA

// // import { useState } from "react"
// // import {Link} from "react-router-dom"
// // import { Button } from "../../ui/Button"
// // import { Card, CardContent } from "../../ui/Card"
// // import { Badge } from "../../ui/Badge"
// // import { Input } from "../../ui/Input"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs"
// // import { ArrowLeft, Search, Calendar, MapPin, Clock, Users, Download, Eye, Filter } from "lucide-react"

// // const bookings = [
// //   {
// //     id: "BK2024001234",
// //     movieTitle: "Fury",
// //     theater: "PVR Cinemas",
// //     screen: "Screen 1",
// //     date: "Dec 18, 2024",
// //     time: "4:45 PM",
// //     seats: ["F7", "F8"],
// //     totalAmount: 770,
// //     status: "confirmed",
// //     movieImage: "/placeholder.svg?height=120&width=80",
// //     bookingDate: "Dec 15, 2024",
// //   },
// //   {
// //     id: "BK2024001235",
// //     movieTitle: "Dune: Part Two",
// //     theater: "INOX",
// //     screen: "Screen 2",
// //     date: "Dec 20, 2024",
// //     time: "7:30 PM",
// //     seats: ["G5", "G6", "G7"],
// //     totalAmount: 1050,
// //     status: "confirmed",
// //     movieImage: "/placeholder.svg?height=120&width=80",
// //     bookingDate: "Dec 16, 2024",
// //   },
// //   {
// //     id: "BK2024001236",
// //     movieTitle: "Oppenheimer",
// //     theater: "Cinepolis",
// //     screen: "Screen 3",
// //     date: "Dec 10, 2024",
// //     time: "3:00 PM",
// //     seats: ["E8", "E9"],
// //     totalAmount: 680,
// //     status: "completed",
// //     movieImage: "/placeholder.svg?height=120&width=80",
// //     bookingDate: "Dec 8, 2024",
// //   },
// // ]

// // export default function Seats() {
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [activeTab, setActiveTab] = useState("all")

// //   const filteredBookings = bookings.filter((booking) => {
// //     const matchesSearch =
// //       booking.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       booking.theater.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       booking.id.toLowerCase().includes(searchQuery.toLowerCase())

// //     const matchesTab =
// //       activeTab === "all" ||
// //       (activeTab === "upcoming" && booking.status === "confirmed") ||
// //       (activeTab === "past" && booking.status === "completed")

// //     return matchesSearch && matchesTab
// //   })

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "confirmed":
// //         return "bg-green-600"
// //       case "completed":
// //         return "bg-gray-600"
// //       case "cancelled":
// //         return "bg-red-600"
// //       default:
// //         return "bg-gray-600"
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-black text-white">
// //       {/* Header */}
// //       <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
// //               <ArrowLeft className="w-5 h-5 mr-2" />
// //               Back to Home
// //             </Link>
// //             <Link href="/" className="text-2xl font-bold text-red-600">
// //               CinemaFlix
// //             </Link>
// //             <div className="w-20"></div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="pt-20 container mx-auto px-4 py-8">
// //         <div className="max-w-6xl mx-auto">
// //           {/* Page Header */}
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
// //             <p className="text-gray-400">Manage and view all your movie bookings</p>
// //           </div>

// //           {/* Search and Filter */}
// //           <div className="flex flex-col sm:flex-row gap-4 mb-6">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input
// //                 placeholder="Search by movie, theater, or booking ID..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
// //               />
// //             </div>
// //             <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
// //               <Filter className="w-4 h-4 mr-2" />
// //               Filter
// //             </Button>
// //           </div>

// //           {/* Tabs */}
// //           <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
// //             <TabsList className="bg-gray-900 border-gray-800">
// //               <TabsTrigger value="all" className="data-[state=active]:bg-red-600">
// //                 All Bookings ({bookings.length})
// //               </TabsTrigger>
// //               <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-600">
// //                 Upcoming ({bookings.filter((b) => b.status === "confirmed").length})
// //               </TabsTrigger>
// //               <TabsTrigger value="past" className="data-[state=active]:bg-red-600">
// //                 Past ({bookings.filter((b) => b.status === "completed").length})
// //               </TabsTrigger>
// //             </TabsList>

// //             <TabsContent value={activeTab} className="mt-6">
// //               {filteredBookings.length === 0 ? (
// //                 <Card className="bg-gray-900 border-gray-800">
// //                   <CardContent className="text-center py-12">
// //                     <div className="text-gray-400 mb-4">
// //                       <Calendar className="w-12 h-12 mx-auto mb-4" />
// //                       <p className="text-lg">No bookings found</p>
// //                       <p className="text-sm">Try adjusting your search or filters</p>
// //                     </div>
// //                     <Link href="/">
// //                       <Button className="bg-red-600 hover:bg-red-700 text-white">Book Your First Movie</Button>
// //                     </Link>
// //                   </CardContent>
// //                 </Card>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {filteredBookings.map((booking) => (
// //                     <Card key={booking.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
// //                       <CardContent className="p-6">
// //                         <div className="flex flex-col lg:flex-row gap-6">
// //                           {/* Movie Image */}
// //                           <div className="flex-shrink-0">
// //                             <img
// //                               src={booking.movieImage || "/placeholder.svg"}
// //                               alt={booking.movieTitle}
// //                               width={80}
// //                               height={120}
// //                               className="rounded-lg"
// //                             />
// //                           </div>

// //                           {/* Booking Details */}
// //                           <div className="flex-1 space-y-4">
// //                             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
// //                               <div>
// //                                 <h3 className="text-xl font-bold text-white mb-2">{booking.movieTitle}</h3>
// //                                 <div className="flex items-center gap-2 mb-2">
// //                                   <Badge className={`${getStatusColor(booking.status)} text-white`}>
// //                                     {booking.status.toUpperCase()}
// //                                   </Badge>
// //                                   <span className="text-sm text-gray-400">Booked on {booking.bookingDate}</span>
// //                                 </div>
// //                               </div>
// //                               <div className="text-right">
// //                                 <p className="text-2xl font-bold text-white">₹{booking.totalAmount}</p>
// //                                 <p className="text-sm text-gray-400">Total Amount</p>
// //                               </div>
// //                             </div>

// //                             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
// //                               <div className="flex items-center text-gray-300">
// //                                 <MapPin className="w-4 h-4 mr-2 text-red-500" />
// //                                 <div>
// //                                   <div className="font-semibold">{booking.theater}</div>
// //                                   <div className="text-gray-400">{booking.screen}</div>
// //                                 </div>
// //                               </div>

// //                               <div className="flex items-center text-gray-300">
// //                                 <Calendar className="w-4 h-4 mr-2 text-red-500" />
// //                                 <div>
// //                                   <div className="font-semibold">{booking.date}</div>
// //                                   <div className="text-gray-400">Show Date</div>
// //                                 </div>
// //                               </div>

// //                               <div className="flex items-center text-gray-300">
// //                                 <Clock className="w-4 h-4 mr-2 text-red-500" />
// //                                 <div>
// //                                   <div className="font-semibold">{booking.time}</div>
// //                                   <div className="text-gray-400">Show Time</div>
// //                                 </div>
// //                               </div>

// //                               <div className="flex items-center text-gray-300">
// //                                 <Users className="w-4 h-4 mr-2 text-red-500" />
// //                                 <div>
// //                                   <div className="font-semibold">{booking.seats.join(", ")}</div>
// //                                   <div className="text-gray-400">{booking.seats.length} Seat(s)</div>
// //                                 </div>
// //                               </div>
// //                             </div>

// //                             <div className="flex flex-wrap gap-3 pt-2">
// //                               <Link href={`/confirmation/${booking.id}`}>
// //                                 <Button
// //                                   size="sm"
// //                                   variant="outline"
// //                                   className="border-gray-600 text-white hover:bg-gray-700"
// //                                 >
// //                                   <Eye className="w-4 h-4 mr-2" />
// //                                   View Ticket
// //                                 </Button>
// //                               </Link>
// //                               <Button
// //                                 size="sm"
// //                                 variant="outline"
// //                                 className="border-gray-600 text-white hover:bg-gray-700"
// //                               >
// //                                 <Download className="w-4 h-4 mr-2" />
// //                                 Download
// //                               </Button>
// //                               {booking.status === "confirmed" && (
// //                                 <Button
// //                                   size="sm"
// //                                   variant="outline"
// //                                   className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
// //                                 >
// //                                   Cancel Booking
// //                                 </Button>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               )}
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// // import { useState } from "react"
// // import { Link } from "react-router-dom"
// // import { Button } from "../../ui/Button"
// // import { Input } from "../../ui/Input"
// // import { Label } from "../../ui/Label"
// // import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card"
// // import { Separator } from "../../ui/Separator"
// // import { RadioGroup, RadioGroupItem } from "../../ui/Radio-group"
// // import { Checkbox } from "../../ui/Checkbox"
// // import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, Users, MapPin, Clock } from "lucide-react"

// // const movieData = {
// //   title: "Fury",
// //   theater: "PVR Cinemas",
// //   date: "Today",
// //   time: "4:45 PM",
// //   screen: "Screen 1",
// //   price: 350,
// // }

// // export default function CheckoutPage({
// //   params,
// //   searchParams,
// // }) {
// //   const [paymentMethod, setPaymentMethod] = useState("card")
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     phone: "",
// //     name: "",
// //     cardNumber: "",
// //     expiryDate: "",
// //     cvv: "",
// //     upiId: "",
// //   })

// //   const selectedSeats = searchParams.seats?.split(",") || []
// //   const totalAmount = Number.parseInt(searchParams.total || "0")

// //   const handleInputChange = (field, value) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }))
// //   }

// //   const handleBooking = () => {
// //     // Simulate booking process
// //     const bookingId = `BK${Date.now()}`

// //     // In a real app, you would:
// //     // 1. Process payment
// //     // 2. Save booking to database
// //     // 3. Send confirmation email
// //     // 4. Generate QR code

// //     // Redirect to confirmation page
// //     window.location.href = `/confirmation/${bookingId}?seats=${selectedSeats.join(",")}&total=${totalAmount}`
// //   }

// //   return (
// //     <div className="min-h-screen bg-black text-white">
// //       {/* Header */}
// //       <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <Link
// //               href={`/booking/${params.id}`}
// //               className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
// //             >
// //               <ArrowLeft className="w-5 h-5 mr-2" />
// //               Back to Seats
// //             </Link>
// //             <Link href="/" className="text-2xl font-bold text-red-600">
// //               CinemaFlix
// //             </Link>
// //             <div className="text-sm text-gray-400">Step 2 of 2</div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="pt-20 container mx-auto px-4 py-8">
// //         <div className="max-w-6xl mx-auto">
// //           <div className="text-center mb-8">
// //             <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
// //             <p className="text-gray-400">Fill in your details and choose payment method</p>
// //           </div>

// //           <div className="grid lg:grid-cols-3 gap-8">
// //             {/* Booking Form */}
// //             <div className="lg:col-span-2 space-y-6">
// //               {/* Contact Information */}
// //               <Card className="bg-gray-900 border-gray-800">
// //                 <CardHeader>
// //                   <CardTitle>Contact Information</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="name">Full Name</Label>
// //                       <Input
// //                         id="name"
// //                         placeholder="Enter your full name"
// //                         value={formData.name}
// //                         onChange={(e) => handleInputChange("name", e.target.value)}
// //                         className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="email">Email Address</Label>
// //                       <Input
// //                         id="email"
// //                         type="email"
// //                         placeholder="Enter your email"
// //                         value={formData.email}
// //                         onChange={(e) => handleInputChange("email", e.target.value)}
// //                         className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="phone">Phone Number</Label>
// //                     <Input
// //                       id="phone"
// //                       placeholder="Enter your phone number"
// //                       value={formData.phone}
// //                       onChange={(e) => handleInputChange("phone", e.target.value)}
// //                       className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                     />
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Payment Method */}
// //               <Card className="bg-gray-900 border-gray-800">
// //                 <CardHeader>
// //                   <CardTitle>Payment Method</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
// //                     <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
// //                       <RadioGroupItem value="card" id="card" />
// //                       <CreditCard className="w-5 h-5 text-gray-400" />
// //                       <Label htmlFor="card" className="flex-1 cursor-pointer">
// //                         Credit/Debit Card
// //                       </Label>
// //                     </div>
// //                     <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
// //                       <RadioGroupItem value="upi" id="upi" />
// //                       <Smartphone className="w-5 h-5 text-gray-400" />
// //                       <Label htmlFor="upi" className="flex-1 cursor-pointer">
// //                         UPI Payment
// //                       </Label>
// //                     </div>
// //                     <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
// //                       <RadioGroupItem value="wallet" id="wallet" />
// //                       <Wallet className="w-5 h-5 text-gray-400" />
// //                       <Label htmlFor="wallet" className="flex-1 cursor-pointer">
// //                         Digital Wallet
// //                       </Label>
// //                     </div>
// //                   </RadioGroup>

// //                   {/* Payment Details */}
// //                   <div className="mt-6">
// //                     {paymentMethod === "card" && (
// //                       <div className="space-y-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="cardNumber">Card Number</Label>
// //                           <Input
// //                             id="cardNumber"
// //                             placeholder="1234 5678 9012 3456"
// //                             value={formData.cardNumber}
// //                             onChange={(e) => handleInputChange("cardNumber", e.target.value)}
// //                             className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                           />
// //                         </div>
// //                         <div className="grid grid-cols-2 gap-4">
// //                           <div className="space-y-2">
// //                             <Label htmlFor="expiryDate">Expiry Date</Label>
// //                             <Input
// //                               id="expiryDate"
// //                               placeholder="MM/YY"
// //                               value={formData.expiryDate}
// //                               onChange={(e) => handleInputChange("expiryDate", e.target.value)}
// //                               className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                             />
// //                           </div>
// //                           <div className="space-y-2">
// //                             <Label htmlFor="cvv">CVV</Label>
// //                             <Input
// //                               id="cvv"
// //                               placeholder="123"
// //                               value={formData.cvv}
// //                               onChange={(e) => handleInputChange("cvv", e.target.value)}
// //                               className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {paymentMethod === "upi" && (
// //                       <div className="space-y-2">
// //                         <Label htmlFor="upiId">UPI ID</Label>
// //                         <Input
// //                           id="upiId"
// //                           placeholder="yourname@upi"
// //                           value={formData.upiId}
// //                           onChange={(e) => handleInputChange("upiId", e.target.value)}
// //                           className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
// //                         />
// //                       </div>
// //                     )}

// //                     {paymentMethod === "wallet" && (
// //                       <div className="text-center py-8 text-gray-400">
// //                         You will be redirected to your wallet provider
// //                       </div>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Terms and Conditions */}
// //               <div className="flex items-center space-x-2">
// //                 <Checkbox id="terms" />
// //                 <Label htmlFor="terms" className="text-sm text-gray-400">
// //                   I agree to the{" "}
// //                   <Link href="#" className="text-red-500 hover:text-red-400">
// //                     Terms and Conditions
// //                   </Link>{" "}
// //                   and{" "}
// //                   <Link href="#" className="text-red-500 hover:text-red-400">
// //                     Privacy Policy
// //                   </Link>
// //                 </Label>
// //               </div>
// //             </div>

// //             {/* Booking Summary */}
// //             <div>
// //               <Card className="bg-gray-900 border-gray-800 sticky top-24">
// //                 <CardHeader>
// //                   <CardTitle>Booking Summary</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div>
// //                     <h3 className="font-semibold mb-2">{movieData.title}</h3>
// //                     <div className="text-sm text-gray-400 space-y-1">
// //                       <div className="flex items-center">
// //                         <MapPin className="w-4 h-4 mr-2" />
// //                         {movieData.theater}
// //                       </div>
// //                       <div className="flex items-center">
// //                         <Clock className="w-4 h-4 mr-2" />
// //                         {movieData.date}, {movieData.time}
// //                       </div>
// //                       <p>{movieData.screen}</p>
// //                     </div>
// //                   </div>

// //                   <Separator className="bg-gray-700" />

// //                   <div>
// //                     <div className="flex items-center justify-between mb-2">
// //                       <span className="flex items-center">
// //                         <Users className="w-4 h-4 mr-2" />
// //                         Selected Seats
// //                       </span>
// //                       <span className="text-red-500 font-semibold">{selectedSeats.length}</span>
// //                     </div>
// //                     <div className="text-sm text-gray-400">{selectedSeats.join(", ")}</div>
// //                   </div>

// //                   <Separator className="bg-gray-700" />

// //                   <div className="space-y-2">
// //                     <div className="flex justify-between">
// //                       <span>Tickets ({selectedSeats.length})</span>
// //                       <span>₹{selectedSeats.length * movieData.price}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm text-gray-400">
// //                       <span>Convenience Fee</span>
// //                       <span>₹{Math.round(selectedSeats.length * movieData.price * 0.1)}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm text-gray-400">
// //                       <span>GST (18%)</span>
// //                       <span>₹{Math.round(totalAmount * 0.18)}</span>
// //                     </div>
// //                     <Separator className="bg-gray-700" />
// //                     <div className="flex justify-between font-bold text-lg">
// //                       <span>Total Amount</span>
// //                       <span>₹{totalAmount}</span>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
// //                     <Shield className="w-4 h-4 mr-2 text-green-500" />
// //                     Your payment is secured with 256-bit SSL encryption
// //                   </div>

// //                   <Button
// //                     onClick={handleBooking}
// //                     className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
// //                     size="lg"
// //                   >
// //                     Complete Booking
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { Button } from "../../ui/Button"
// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card"
// import { Badge } from "../../ui/Badge"
// import { Separator } from "../../ui/Separator"
// import { ArrowLeft, Users, Eye } from "lucide-react"
// import { useNavigate } from "react-router-dom"



// export default function BookingPage() {
// //   const [movieData, setmovieData] = useState({})
// //   const [seatData, setseatData] = useState([])
// //   const [selectedSeats, setSelectedSeats] = useState([])

// //   useEffect(() => {
// //     const fetchData = async() => {
// //       const response = await fetch(`/api/v1/booking/seats/${localStorage.getItem("Showtime")}`,{
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${localStorage.getItem("usertoken")}`,
// //         },

// //       })
// //       const data = response.json().then((data) => {
          
// //           setseatData(data.availableSeats);
// //           setmovieData(data.showtime);
// //           setStatus();
        
// //       }).catch((error) => {
// //         console.error("Error fetching movie data:", error);
// //       })
// // }

// //   fetchData();
// // }, [])
  

// //   const handleSeatClick = (row, seatNumber, status) => {
// //     if (status === "occupied") return

// //     const seatId = `${row}${seatNumber}`
// //     setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]))
    
// //   }

// //   let updatedSeatLayout = [...seatLayout]

// //   const setStatus = () => {
// //     updatedSeatLayout = seatLayout.map((row) => ({
// //       ...row,
// //       seats: row.seats.map((seat) => {
        
// //         const seatRow = `${row.row}`;
// //         const seatColumn = `${seat.number}`;

// //         return {
// //           ...seat,
// //           status: (seatData.includes(seatRow) && seatData.includes(seatColumn)) ? "occupied" : "available",
// //         }
// //       }),
// //     }))
// //   }
    

// //   const getSeatStatus = (row, seatNumber, originalStatus) => {
// //     const seatId = `${row}-${seatNumber}`
// //     // if(!seatData.includes(row) && !seatData.includes(seatNumber)) return "occupied"
// //     if (selectedSeats.includes(seatId)) return "selected"
// //     return originalStatus
// //   }

// //   const totalPrice = selectedSeats.length * movieData?.price

// const navigate = useNavigate();
//     const [movieData, setMovieData] = useState({});
//     const [seatLayout, setSeatLayout] = useState([]); // This will hold the grid with correct statuses.
//     const [selectedSeats, setSelectedSeats] = useState([]); // Will store { displayId: 'A1', dbId: '...' }
//     const [apiAvailableSeats, setApiAvailableSeats] = useState([]); // To get seat _id later

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const showtimeId = localStorage.getItem("Showtime");
//                 if (!showtimeId) {
//                     toast.error("Showtime not found. Please select a movie and showtime again.");
//                     navigate("/"); // Redirect to home if no showtime is selected
//                     return;
//                 }

//                 const response = await fetch(`/api/v1/booking/seats/${showtimeId}`, {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch seat data.");
//                 }

//                 const data = await response.json();
                
//                 setMovieData(data.showtime);
//                 setApiAvailableSeats(data.availableSeats);

//                 // Create a set of available seat IDs (e.g., 'A-1', 'B-5') for fast lookups
//                 const availableSeatIds = new Set(
//                     data.availableSeats.map(seat => `${seat.row}-${seat.column}`)
//                 );

//                 // Create the final layout by marking seats as 'available' or 'occupied'
//                 const initialLayout = baseSeatLayout.map(row => ({
//                     ...row,
//                     seats: row.seats.map(seat => ({
//                         ...seat,
//                         status: availableSeatIds.has(`${row.row}-${seat.number}`) ? "available" : "occupied",
//                     })),
//                 }));

//                 setSeatLayout(initialLayout);

//             } catch (error) {
//                 toast.error(error.message || "Error fetching movie data.");
//                 console.error("Error fetching movie data:", error);
//             }
//         };

//         fetchData();
//     }, [navigate]);

//     const handleSeatClick = (row, seatNumber, status) => {
//         if (status === "occupied") return;

//         const displayId = `${row}-${seatNumber}`;
//         const isSelected = selectedSeats.some(seat => seat.displayId === displayId);

//         if (isSelected) {
//             // Remove from selection
//             setSelectedSeats(prev => prev.filter(seat => seat.displayId !== displayId));
//         } else {
//             // Add to selection
//             // Find the full seat object from the API data to get its database _id
//             const seatFromApi = apiAvailableSeats.find(s => s.row === row && s.column === seatNumber);
//             if (seatFromApi) {
//                 setSelectedSeats(prev => [...prev, { displayId, dbId: seatFromApi._id }]);
//             } else {
//                 console.error("Critical error: Clicked seat not found in available seats list.");
//                 toast.error("An unexpected error occurred. Please refresh.");
//             }
//         }
//     };

//     const handleProceedToPayment = async () => {
//         if (selectedSeats.length === 0) {
//             toast.error("Please select at least one seat.");
//             return;
//         }

//         const showtimeId = localStorage.getItem("Showtime");
//         const userId = localStorage.getItem("userId");
//         const selectedDbIds = selectedSeats.map(seat => seat.dbId);

//         try {
//             const response = await fetch(`/api/v1/booking/seats/${showtimeId}/${userId}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                 },
//                 body: JSON.stringify({ SelectedSeatIds: selectedDbIds }),
//             });
            
//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Failed to hold seats.");
//             }

//             toast.success("Seats held successfully! Proceeding to payment.");
            
//             // Navigate to checkout, passing seat names and total for summary display
//             const seatNames = selectedSeats.map(s => s.displayId.replace("-", "")).join(',');
//             const total = totalPrice + Math.round(totalPrice * 0.1); // Match calculation on summary
//             navigate(`/checkout?seats=${seatNames}&total=${total}`);

//         } catch (error) {
//             toast.error(error.message || "Failed to book seats. Please try again.");
//             console.error("Booking error:", error);
//         }
//     };

//     // Correctly get the set of selected display IDs for efficient lookup during render
//     const selectedDisplayIds = new Set(selectedSeats.map(s => s.displayId));
//     const totalPrice = selectedSeats.length * (movieData?.price || 0);

//   return (
//     // <div className="min-h-screen bg-black text-white">
//     //   {/* Header */}
//     //   <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
//     //     <div className="container mx-auto px-4 py-4">
//     //       <div className="flex items-center justify-between">
//     //         <Link
//     //           to={`/movie/`}
//     //           className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
//     //         >
//     //           <ArrowLeft className="w-5 h-5 mr-2" />
//     //           Back to Movie
//     //         </Link>
//     //         <Link href="/" className="text-2xl font-bold text-red-600">
//     //           CinemaFlix
//     //         </Link>
//     //         <div className="text-sm text-gray-400">Step 1 of 2</div>
//     //       </div>
//     //     </div>
//     //   </header>

//     //   <div className="pt-20 container mx-auto px-4 py-8">
//     //     <div className="max-w-6xl mx-auto">
//     //       {/* Movie Info */}
//     //       <div className="text-center mb-8">
//     //         <h1 className="text-3xl font-bold mb-2">{movieData?.title}</h1>
//     //         <div className="flex items-center justify-center space-x-4 text-gray-400">
//     //           <span>{movieData?.theater}</span>
//     //           <span>•</span>
//     //           <span>
//     //             {movieData?.date}, {movieData?.time}
//     //           </span>
//     //           <span>•</span>
//     //           <span>{movieData?.screen}</span>
//     //         </div>
//     //       </div>

//     //       <div className="grid lg:grid-cols-3 gap-8">
//     //         {/* Seat Selection */}
//     //         <div className="lg:col-span-2">
//     //           <Card className="bg-gray-900 border-gray-800">
//     //             <CardHeader>
//     //               <CardTitle className="text-center">Select Your Seats</CardTitle>
//     //               <div className="flex items-center justify-center space-x-6 text-sm">
//     //                 <div className="flex items-center">
//     //                   <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
//     //                   Available
//     //                 </div>
//     //                 <div className="flex items-center">
//     //                   <div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>
//     //                   Selected
//     //                 </div>
//     //                 <div className="flex items-center">
//     //                   <div className="w-4 h-4 bg-gray-400 rounded-sm mr-2"></div>
//     //                   Occupied
//     //                 </div>
//     //               </div>
//     //             </CardHeader>
//     //             <CardContent>
//     //               {/* Screen */}
//     //               <div className="mb-8">
//     //                 <div className="bg-gradient-to-r from-transparent via-gray-600 to-transparent h-1 rounded-full mb-2"></div>
//     //                 <div className="text-center text-gray-400 text-sm flex items-center justify-center">
//     //                   <Eye className="w-4 h-4 mr-2" />
//     //                   SCREEN
//     //                 </div>
//     //               </div>

//     //               {/* Seats */}
//     //               <div className="space-y-3">
//     //                 {updatedSeatLayout.map((row) => (
//     //                   <div key={row.row} className="flex items-center justify-center space-x-2">
//     //                     <div className="w-8 text-center text-gray-400 font-mono">{row.row}</div>
//     //                     <div className="flex space-x-1">
//     //                       {row.seats.map((seat) => {
//     //                         const status = getSeatStatus(row.row, seat.number, seat.status)
//     //                         return (
//     //                           <button
//     //                             key={seat.number}
//     //                             onClick={() => handleSeatClick(row.row, seat.number, seat.status)}
//     //                             disabled={seat.status === "occupied"}
//     //                             className={`w-8 h-8 rounded-sm text-xs font-mono transition-all duration-200 ${
//     //                               status === "available"
//     //                                 ? "bg-gray-600 hover:bg-gray-500 text-white"
//     //                                 : status === "selected"
//     //                                   ? "bg-red-600 text-white scale-110"
//     //                                   : "bg-gray-400 text-gray-600 cursor-not-allowed"
//     //                             }`}
//     //                           >
//     //                             {seat.number}
//     //                           </button>
//     //                         )
//     //                       })}
//     //                     </div>
//     //                   </div>
//     //                 ))}
//     //               </div>
//     //             </CardContent>
//     //           </Card>
//     //         </div>

//     //         {/* Booking Summary */}
//     //         <div>
//     //           <Card className="bg-gray-900 border-gray-800 sticky top-24">
//     //             <CardHeader>
//     //               <CardTitle>Booking Summary</CardTitle>
//     //             </CardHeader>
//     //             <CardContent className="space-y-4">
//     //               <div>
//     //                 <h3 className="font-semibold mb-2">{movieData?.title}</h3>
//     //                 <div className="text-sm text-gray-400 space-y-1">
//     //                   <p>{movieData?.theater}</p>
//     //                   <p>
//     //                     {movieData?.date}, {movieData?.time}
//     //                   </p>
//     //                   <p>{movieData?.screen}</p>
//     //                 </div>
//     //               </div>

//     //               <Separator className="bg-gray-700" />

//     //               <div>
//     //                 <div className="flex items-center justify-between mb-2">
//     //                   <span className="flex items-center">
//     //                     <Users className="w-4 h-4 mr-2" />
//     //                     Selected Seats
//     //                   </span>
//     //                   <Badge variant="secondary" className="bg-red-600">
//     //                     {selectedSeats.length}
//     //                   </Badge>
//     //                 </div>
//     //                 {selectedSeats.length > 0 && (
//     //                   <div className="text-sm text-gray-400">{selectedSeats.join(", ")}</div>
//     //                 )}
//     //               </div>

//     //               <Separator className="bg-gray-700" />

//     //               <div className="space-y-2">
//     //                 <div className="flex justify-between">
//     //                   <span>Tickets ({selectedSeats.length})</span>
//     //                   <span>₹{totalPrice}</span>
//     //                 </div>
//     //                 <div className="flex justify-between text-sm text-gray-400">
//     //                   <span>Convenience Fee</span>
//     //                   <span>₹{Math.round(totalPrice * 0.1)}</span>
//     //                 </div>
//     //                 <Separator className="bg-gray-700" />
//     //                 <div className="flex justify-between font-bold text-lg">
//     //                   <span>Total</span>
//     //                   <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
//     //                 </div>
//     //               </div>

//     //               <Link
//     //                 to={`/checkout`}
//     //               >
//     //                 <Button
//     //                   className="w-full bg-red-600 hover:bg-red-700 text-white"
//     //                   disabled={selectedSeats.length === 0}
//     //                 >
//     //                   Proceed to Payment
//     //                 </Button>
//     //               </Link>
//     //             </CardContent>
//     //           </Card>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="min-h-screen bg-black text-white">
//             {/* Header */}
//             <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
//                 <div className="container mx-auto px-4 py-4">
//                     <div className="flex items-center justify-between">
//                         <Link to={`/movie/`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
//                             <ArrowLeft className="w-5 h-5 mr-2" />
//                             Back to Movie
//                         </Link>
//                         <Link to="/" className="text-2xl font-bold text-red-600">
//                             CinemaFlix
//                         </Link>
//                         <div className="text-sm text-gray-400">Step 1 of 2</div>
//                     </div>
//                 </div>
//             </header>

//             <div className="pt-20 container mx-auto px-4 py-8">
//                 <div className="max-w-6xl mx-auto">
//                     {/* Movie Info */}
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-bold mb-2">{movieData?.movie?.title || 'Loading...'}</h1>
//                         <div className="flex items-center justify-center space-x-4 text-gray-400">
//                             <span>{movieData?.theater?.name}</span>
//                             <span>•</span>
//                             <span>{new Date(movieData?.startTime).toLocaleDateString()}</span>
//                             <span>•</span>
//                             <span>Screen {movieData?.screen?.screenNumber}</span>
//                         </div>
//                     </div>

//                     <div className="grid lg:grid-cols-3 gap-8">
//                         {/* Seat Selection */}
//                         <div className="lg:col-span-2">
//                             <Card className="bg-gray-900 border-gray-800">
//                                 <CardHeader>
//                                     <CardTitle className="text-center">Select Your Seats</CardTitle>
//                                     <div className="flex items-center justify-center space-x-6 text-sm mt-4">
//                                         <div className="flex items-center"><div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>Available</div>
//                                         <div className="flex items-center"><div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>Selected</div>
//                                         <div className="flex items-center"><div className="w-4 h-4 bg-gray-400 rounded-sm mr-2"></div>Occupied</div>
//                                     </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="mb-8">
//                                         <div className="bg-gradient-to-r from-transparent via-gray-600 to-transparent h-1 rounded-full mb-2"></div>
//                                         <div className="text-center text-gray-400 text-sm flex items-center justify-center"><Eye className="w-4 h-4 mr-2" />SCREEN</div>
//                                     </div>
//                                     <div className="space-y-3">
//                                         {seatLayout.map((row) => (
//                                             <div key={row.row} className="flex items-center justify-center space-x-2">
//                                                 <div className="w-8 text-center text-gray-400 font-mono">{row.row}</div>
//                                                 <div className="flex flex-wrap justify-center gap-1">
//                                                     {row.seats.map((seat) => {
//                                                         const displayId = `${row.row}-${seat.number}`;
//                                                         const isSelected = selectedDisplayIds.has(displayId);
//                                                         const status = isSelected ? 'selected' : seat.status;
//                                                         return (
//                                                             <button
//                                                                 key={seat.number}
//                                                                 onClick={() => handleSeatClick(row.row, seat.number, seat.status)}
//                                                                 disabled={seat.status === "occupied"}
//                                                                 className={`w-8 h-8 rounded-sm text-xs font-mono transition-all duration-200 ${
//                                                                     status === "available" ? "bg-gray-600 hover:bg-gray-500 text-white"
//                                                                     : status === "selected" ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-500/50"
//                                                                     : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                                                                 }`}
//                                                             >
//                                                                 {seat.number}
//                                                             </button>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* Booking Summary */}
//                         <div>
//                             <Card className="bg-gray-900 border-gray-800 sticky top-24">
//                                 <CardHeader>
//                                     <CardTitle>Booking Summary</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div>
//                                         <h3 className="font-semibold mb-2">{movieData?.movie?.title || 'N/A'}</h3>
//                                         <div className="text-sm text-gray-400 space-y-1">
//                                             <p>{movieData?.theater?.name}, {movieData?.theater?.location}</p>
//                                             <p>{new Date(movieData?.startTime).toLocaleString()}</p>
//                                             <p>Screen {movieData?.screen?.screenNumber}</p>
//                                         </div>
//                                     </div>
//                                     <Separator className="bg-gray-700" />
//                                     <div>
//                                         <div className="flex items-center justify-between mb-2">
//                                             <span className="flex items-center"><Users className="w-4 h-4 mr-2" />Selected Seats</span>
//                                             <Badge variant="secondary" className="bg-red-600">{selectedSeats.length}</Badge>
//                                         </div>
//                                         {selectedSeats.length > 0 && (
//                                             <div className="text-sm text-gray-400 break-words">
//                                                 {selectedSeats.map(s => s.displayId.replace("-", "")).join(", ")}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <Separator className="bg-gray-700" />
//                                     <div className="space-y-2">
//                                         <div className="flex justify-between">
//                                             <span>Tickets ({selectedSeats.length})</span>
//                                             <span>₹{totalPrice}</span>
//                                         </div>
//                                         <div className="flex justify-between text-sm text-gray-400">
//                                             <span>Convenience Fee</span>
//                                             <span>₹{Math.round(totalPrice * 0.1)}</span>
//                                         </div>
//                                         <Separator className="bg-gray-700" />
//                                         <div className="flex justify-between font-bold text-lg">
//                                             <span>Total</span>
//                                             <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
//                                         </div>
//                                     </div>
//                                     <Button
//                                         onClick={handleProceedToPayment}
//                                         className="w-full bg-red-600 hover:bg-red-700 text-white"
//                                         disabled={selectedSeats.length === 0}
//                                     >
//                                         {selectedSeats.length === 0 ? "Select Seats to Continue" : "Proceed to Payment"}
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                toast.error(error.message || "Error fetching movie data.");
                console.error("Error fetching movie data:", error);
                navigate("/");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [navigate]);

    const handleSeatClick = (row, seatNumber, status) => {
        if (status === "occupied") return;

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