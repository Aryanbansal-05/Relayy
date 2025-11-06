import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, User, Mail, School, MapPin, Save, ArrowLeft } from "lucide-react";


const EditProfile = () => {
    const navigate = useNavigate();
    const backendURL = "https://relayy-backend-9war.onrender.com";

    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        college: "",
        hostel: "",
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // --- Data Fetching & Initial Setup ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await axios.get(`${backendURL}/api/v1/users/verify`, {
                    withCredentials: true,
                });
                const fetchedUser = userRes.data.user;
                setUser(fetchedUser);
                setFormData({
                    username: fetchedUser.username || "",
                    email: fetchedUser.email || "",
                    college: fetchedUser.college || "",
                    hostel: fetchedUser.hostel || "",
                });
            } catch (err) {
                console.error("Failed to fetch user data for editing:", err);
                // Redirect to login if verification fails
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // --- Form Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null); // Clear error on new input
        if (successMessage) setSuccessMessage(null); // Clear success on new input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const updateRes = await axios.patch(
                `${backendURL}/api/v1/users/updateMe`,
                formData,
                { withCredentials: true }
            );

            // Update local state with the new user data
            setUser(updateRes.data.user); 
            setSuccessMessage("Profile updated successfully!");

            // Optionally navigate back to the profile after a short delay
            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (err) {
            console.error("Update failed:", err);
            // Handle specific error message from the backend if available
            const errMsg = err.response?.data?.message || "Failed to update profile. Please try again.";
            setError(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Loading State ---
    if (loading)
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
            </div>
        );

    // --- Component Render ---
    return (
        // Outer padding for the content area
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 font-sans">
            
            {/* --- Encasing Box for Edit Profile --- */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 p-8">

                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800">
                            Edit Your Profile
                        </span>
                    </h1>
                    <button 
                        onClick={() => navigate('/profile')}
                        className="flex items-center text-gray-600 hover:text-emerald-600 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        Back to Profile
                    </button>
                </div>
                
                {/* --- Form Section --- */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Username Field */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center">
                            <User className="w-4 h-4 mr-2 text-emerald-600" /> Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                        />
                    </div>

                    {/* Email Field - Should often be read-only or handled separately */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-emerald-600" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            // Email is often read-only, but kept editable for demonstration
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                        />
                    </div>

                    {/* College Field */}
                    <div className="space-y-2">
                        <label htmlFor="college" className="text-sm font-medium text-gray-700 flex items-center">
                            <School className="w-4 h-4 mr-2 text-emerald-600" /> College/University
                        </label>
                        <input
                            type="text"
                            id="college"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                            placeholder="e.g., IIT Delhi"
                        />
                    </div>

                    {/* Hostel Field */}
                    <div className="space-y-2">
                        <label htmlFor="hostel" className="text-sm font-medium text-gray-700 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-emerald-600" /> Hostel/Residence
                        </label>
                        <input
                            type="text"
                            id="hostel"
                            name="hostel"
                            value={formData.hostel}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                            placeholder="e.g., Himalaya Hostel"
                        />
                    </div>

                    {/* --- Status Messages --- */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}

                    {/* --- Submit Button --- */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg transition-all duration-300 ${
                            isSubmitting
                                ? 'bg-emerald-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-[1.01]'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5 mr-3" />
                                Save Changes
                            </>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default EditProfile;