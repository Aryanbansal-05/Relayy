import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, User, Plus, LogOut, LayoutList } from "lucide-react"; 
import { useLocation } from "react-router-dom";
import relayyLogo from "./relayy(logo).svg"; 

function Navbar({ searchQuery, setSearchQuery }) {
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = async () => {
        try {
            await axios.post(
                "https://relayy-backend-9war.onrender.com/api/v1/users/logout",
                {},
                { withCredentials: true }
            );
            localStorage.removeItem("token");
            window.location.href = "/";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const hideSearch = location.pathname.startsWith("/product/");

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);

    // Helper to determine if a link is active
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-full bg-white shadow-md px-6 md:px-12 py-4 flex items-center justify-between">
            
            {/* Logo */}
            <a href="/home" className="flex items-center space-x-2 flex-shrink-0">
                <img src={relayyLogo} alt="Relayy Logo" className="w-9 h-9" /> {/* Slightly larger logo */}
                <span className="text-2xl font-extrabold text-emerald-700"> {/* Stronger text */}
                    RELAYY
                </span>
            </a>

            {/* Center Links */}
            <div className="hidden md:flex items-center space-x-7 font-medium ml-8 flex-grow-0"> {/* Adjusted spacing and removed flex-grow */}
                <a
                    href="/home"
                    className={`relative text-gray-700 hover:text-emerald-700 transition
                        ${isActive('/home') ? 'text-emerald-700 font-semibold before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-emerald-600' : ''}
                    `}
                >
                    Home
                </a>
                <a
                    href="/all-products"
                    className={`relative text-gray-700 hover:text-emerald-700 transition
                        ${isActive('/all-products') ? 'text-emerald-700 font-semibold before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-emerald-600' : ''}
                    `}
                >
                    Browse
                </a>
                <a
                    href="/contact"
                    className={`relative text-gray-700 hover:text-emerald-700 transition
                        ${isActive('/contact') ? 'text-emerald-700 font-semibold before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-emerald-600' : ''}
                    `}
                >
                    Contact
                </a>
                <a
                    href="/about"
                    className={`relative text-gray-700 hover:text-emerald-700 transition
                        ${isActive('/about') ? 'text-emerald-700 font-semibold before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-emerald-600' : ''}
                    `}
                >
                    About Us
                </a>
            </div>

            {/* Right Section: Search + Buttons */}
            <div className="flex items-center space-x-4 ml-auto"> {/* Used ml-auto to push to right */}
                
                {/* Search Bar (Conditionally Rendered & Larger) */}
                {!hideSearch && (
                    //  Wider search bar, rounded, shadow-inner
                    <div className="hidden lg:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 w-80 shadow-inner focus-within:ring-2 focus-within:ring-emerald-300 transition-all duration-200">
                        <Search className="w-5 h-5 text-gray-500 mr-2" /> {/* Slightly larger icon, darker color */}
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base" // {/* THIS IS WHERE THE ERROR WAS */}
                        />
                    </div>
                )}

                {/* List an Item (Primary CTA Button with Gradient) */}
                <a
                    href="/sell"
                    className="flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-full font-semibold hover:from-emerald-700 hover:to-emerald-800 transition shadow-md whitespace-nowrap" // Rounded, better padding
                >
                    <Plus className="w-5 h-5 mr-2" /> {/* Larger icon */}
                    List an Item
                </a>

                {/* Profile Dropdown Menu */}
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="p-2.5 rounded-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition relative" // Larger padding, hover colors
                        title="Account"
                    >
                        <User className="w-6 h-6" /> {/* Larger user icon */}
                    </button>

                    {/* Dropdown Panel */}
                    {isProfileOpen && (
                        // Wider dropdown, added animation
                        <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-100 animate-fade-in-down"> 
                            <a
                                href="/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                            >
                                <User className="w-4 h-4 mr-2 text-emerald-500" />
                                My Profile
                            </a>
                            <a
                                href="/my-listings"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                            >
                                <LayoutList className="w-4 h-4 mr-2 text-emerald-500" />
                                My Listings
                            </a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                            >
                                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;

