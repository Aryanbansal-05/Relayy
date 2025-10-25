import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Loader2, Edit, LogOut, Star, School, MapPin } from "lucide-react"; // <-- Added School and MapPin

const Hero = () => {
    const [user, setUser] = useState(null);
    const [myAds, setMyAds] = useState([]);
    const [offersMade, setOffersMade] = useState([]); // <-- State for your offers
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("items"); // 'items' or 'offers'
    const navigate = useNavigate();

    const backendURL = "https://relayy-backend-9war.onrender.com";

    // --- Data Fetching ---
    useEffect(() => {
        const fetchUserAndAds = async () => {
            try {
                // 1. Fetch user data
                const userRes = await axios.get(`${backendURL}/api/v1/users/verify`, {
                    withCredentials: true,
                });
                setUser(userRes.data.user);

                // 2. Fetch user's ads
                const adsRes = await axios.get(`${backendURL}/api/v1/products/my`, {
                    withCredentials: true,
                });
                setMyAds(adsRes.data);

                // 3. (Future) Fetch user's made offers
                // const offersRes = await axios.get(`${backendURL}/api/v1/offers/my`, {
                //     withCredentials: true,
                // });
                // setOffersMade(offersRes.data);

            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndAds();
    }, [backendURL, navigate]);

    // --- Logout Handler ---
    const handleLogout = async () => {
        try {
            await axios.post(
                `${backendURL}/api/v1/users/logout`,
                {},
                { withCredentials: true }
            );
            localStorage.removeItem("token");
            window.location.href = "/";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (loading)
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
            </div>
        );

    return (
        // This outer div provides the padding *around* the white box
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 font-sans">
            
            {/* --- THIS IS THE "ENCASING BOX" --- */}
            {/* Added a stronger shadow and border for depth */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
                {/* The two-column grid is now INSIDE the white box */}
                <div className="grid grid-cols-1 lg:grid-cols-3">

                    {/* --- LEFT COLUMN (Profile + Rating) --- */}
                    <div className="lg:col-span-1 lg:border-r lg:border-gray-200">
                        
                        {/* Profile Card */}
                        <div className="p-6 text-center border-b border-gray-200">
                            {/* --- Creative Avatar Border --- */}
                            <div className="relative w-32 h-32 mx-auto mb-4 p-1 rounded-full bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-500">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.username || 'A'}&background=fff&color=10755e&size=128&bold=true`}
                                    alt="Profile Avatar"
                                    className="w-full h-full rounded-full border-4 border-white"
                                />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                            
                            {/* --- Creative User Details --- */}
                            <div className="mt-2 text-sm text-emerald-900 bg-emerald-50 rounded-lg p-3 max-w-xs mx-auto border border-emerald-100">
                                <div className="flex items-center justify-center">
                                    <School size={14} className="mr-2 flex-shrink-0" />
                                    <span>{user?.college || 'Campus University'}</span>
                                </div>
                                <div className="flex items-center justify-center mt-1">
                                    <MapPin size={14} className="mr-2 flex-shrink-0" />
                                    <span>{user?.hostel || 'Campus Hostel'}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                                <button 
                                    onClick={() => navigate('/edit-profile')}
                                    className="flex-1 flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all transform hover:scale-105"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-md"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                        
                        {/* Seller Rating Card (Placeholder) */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Seller Rating</h3>
                            <div className="flex items-center gap-3">
                                {/* --- Creative Rating Text --- */}
                                <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">4.5</span>
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-400">
                                        <Star size={20} fill="currentColor" />
                                        <Star size={20} fill="currentColor" />
                                        <Star size={20} fill="currentColor" />
                                        <Star size={20} fill="currentColor" />
                                        <Star size={20} className="text-gray-300" fill="currentColor" />
                                    </div>
                                    <span className="text-gray-500 text-sm">125 reviews</span>
                                </div>
                            </div>
                            {/* --- Creative Rating Bars --- */}
                            <div className="space-y-2 mt-4 text-xs text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>5</span> <Star size={12} /> <div className="w-full h-2 bg-gray-200 rounded-full"><div className="w-[60%] h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div></div> <span>60%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>4</span> <Star size={12} /> <div className="w-full h-2 bg-gray-200 rounded-full"><div className="w-[25%] h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div></div> <span>25%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>3</span> <Star size={12} /> <div className="w-full h-2 bg-gray-200 rounded-full"><div className="w-[10%] h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div></div> <span>10%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>2</span> <Star size={12} /> <div className="w-full h-2 bg-gray-200 rounded-full"><div className="w-[3%] h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div></div> <span>3%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>1</span> <Star size={12} /> <div className="w-full h-2 bg-gray-200 rounded-full"><div className="w-[2%] h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div></div> <span>2%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (TABS) --- */}
                    <div className="lg:col-span-2">
                        {/* Tab Headers */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab("items")}
                                className={`py-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'items' ? 'text-emerald-600 border-b-4 border-emerald-600' : 'text-gray-500 hover:bg-emerald-50'}`}
                            >
                                Items for Sale ({myAds.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("offers")}
                                className={`py-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'offers' ? 'text-emerald-600 border-b-4 border-emerald-600' : 'text-gray-500 hover:bg-emerald-50'}`}
                            >
                                Offers Made ({offersMade.length})
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {/* "Items for Sale" Tab */}
                            {activeTab === 'items' && (
                                <div>
                                    {myAds.length === 0 ? (
                                        <p className="text-gray-600">You haven’t listed any items for sale yet.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {myAds.map((ad) => (
                                                <div
                                                    key={ad._id}
                                                    onClick={() => navigate(`/Myproduct/${ad._id}`)}
                                                    // --- Creative Card Interaction ---
                                                    className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer"
                                                >
                                                    <img
                                                        src={ad.imageUrls?.[0] || 'https://placehold.co/300x300/e2e8f0/64748b?text=No+Image'}
                                                        alt={ad.title}
                                                        className="h-48 w-full object-cover"
                                                    />
                                                    <div className="p-4">
                                                        <h5 className="text-lg font-bold text-gray-900 truncate">
                                                            {ad.title}
                                                        </h5>
                                                        {/* --- Creative Price Text --- */}
                                                        <p className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 mt-1">
                                                            ₹{ad.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* "Offers Made" Tab */}
                            {activeTab === 'offers' && (
                                <div>
                                    {offersMade.length === 0 ? (
                                        <div className="text-center py-10">
                                            <p className="text-gray-600">You haven't made any offers yet.</p>
                                            {/* --- Creative Button --- */}
                                            <button 
                                                onClick={() => navigate('/all-products')} 
                                                className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition shadow-md transform hover:scale-105"
                                            >
                                                Browse Items
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* You would map over `offersMade` here once you fetch them */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;

