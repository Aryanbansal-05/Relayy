import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const Hero = () => {
    const [user, setUser] = useState(null);
    const [myAds, setMyAds] = useState([]); // ✅ store user's ads
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Backend URL auto-switch
  const backendURL = "https://relayy-backend-9war.onrender.com";


    // ✅ Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/v1/users/verify`, {
                    withCredentials: true,
                });
                setUser(res.data.user);
                // ✅ fetch user ads once logged in
                fetchUserAds();
            } catch (err) {
                console.error("Failed to fetch user:", err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        const fetchUserAds = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/v1/products/my`, {
                    withCredentials: true,
                });
                setMyAds(res.data);
            } catch (err) {
                console.error("Error fetching user ads:", err);
            }
        };

        fetchUser();
    }, [backendURL, navigate]);

    if (loading)
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        );

    return (
        <div className="font-josefin min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto py-10 px-6">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                        My Profile
                    </h2>

                    {user ? (
                        <div className="space-y-3 text-gray-700">
                            <p>
                                <span className="font-semibold">Username:</span> {user.username}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            <p>
                                <span className="font-semibold">College:</span> {user.college}
                            </p>
                            <p>
                                <span className="font-semibold">Hostel:</span> {user.hostel}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No user data available.</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-800">Your Activity</h3>
                    <button
                        onClick={() => navigate("/sell")}
                        className="bg-purple-700 text-white px-5 py-2 rounded-md hover:bg-purple-800 transition"
                    >
                        + Sell an Item
                    </button>
                </div>

                {/* My Ads Section */}
                <section>
                    <h4 className="text-lg font-semibold text-purple-700 mb-3">
                        📢 My Ads
                    </h4>

                    {myAds.length === 0 ? (
                        <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
                            <p>You haven’t listed any items for sale yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myAds.map((ad) => (
                                <div
                                    key={ad._id}
                                   onClick={() => navigate(`/Myproduct/${ad._id}`)}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                                >

                                    {/* ✅ Image Carousel */}
                                    <div className="relative">
                                        {ad.imageUrls && ad.imageUrls.length > 0 ? (
                                            <img
                                                src={ad.imageUrls[0]} // show first image
                                                alt={ad.title}
                                                className="h-48 w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Ad Details */}
                                    <div className="p-4">
                                        <h5 className="text-lg font-semibold text-gray-800 truncate">
                                            {ad.title}
                                        </h5>
                                        <p className="text-gray-600 mt-1 text-sm truncate">
                                            {ad.description || "No description"}
                                        </p>
                                        <p className="text-purple-700 font-semibold mt-2">
                                            ₹{ad.price}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {ad.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Hero;
