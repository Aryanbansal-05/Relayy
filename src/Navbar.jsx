import React from "react";
import { Search } from "lucide-react";

function Navbar({ searchQuery, setSearchQuery }) {
    return (
        <nav className="w-full bg-white shadow-sm px-20 py-10 flex items-center justify-between ">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <a className="text-xl font-bold text-purple-800" href="/">RELAYY</a>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex space-x-8 font-medium">
                <a
                    href="/home"
                    className="text-gray-700 hover:text-purple-600 hover:underline transition"
                >
                    Home
                </a>
               <a
                    href="contact"
                    className="text-gray-700 hover:text-purple-600 hover:underline transition"
                >
                    Contact
                </a>
                <a
                    href="faqs"
                    className="text-gray-700 hover:text-purple-600 hover:underline transition"
                >
                    FAQs
                </a>
            </div>


            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // 🔹 live updates search
                    className="flex-1 outline-none text-gray-600"
                />
               
            </div>
        </nav>
    );
}

export default Navbar;
