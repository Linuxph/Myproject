import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { ArrowLeft, User, Mail, Phone, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/v1/user/me", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("usertoken")}` },
                });
                if (!response.ok) throw new Error("Failed to fetch profile.");
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                toast.error(error.message);
                navigate("/auth");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-3">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white text-2xl">{user?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <Mail className="w-5 h-5 text-red-500 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-white">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <Phone className="w-5 h-5 text-red-500 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Phone</p>
                                <p className="text-white">{user?.phone_no}</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
