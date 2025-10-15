import React from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom"; // ✅ Import
import relayyLogo from "./relayy(logo).svg";

function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation(); // ✅ Detect current route

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://relayy-backend-9war.onrender.com/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      localStorage.clear();
      window.location.href = "/"; // redirect to landing/login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Hide search bar on Product page
  const hideSearch = location.pathname.startsWith("/product/");

  return (
    <nav className="w-full bg-white shadow-sm px-20 py-10 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
          <img src={relayyLogo} alt="Relayy Logo" className="w-8 h-8" />
        </div>
        <a className="text-xl font-bold text-purple-800" href="/home">
          RELAYY
        </a>
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
          href="/contact"
          className="text-gray-700 hover:text-purple-600 hover:underline transition"
        >
          Contact
        </a>
        <a
          href="/faqs"
          className="text-gray-700 hover:text-purple-600 hover:underline transition"
        >
          FAQs
        </a>
      </div>

      {/* Right Section: Search + Logout */}
      <div className="flex items-center space-x-4">
        {/* ✅ Conditionally Render Search */}
        {!hideSearch && (
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-64">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-600"
            />
          </div>
        )}

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
