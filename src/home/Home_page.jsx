import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../Navbar"; 
import Hero from "./Hero";
import Categories from "./Categories";
import RecentlyListed from "./RecentlyListed";

// Icons for the features section
import { PlusCircle, ShieldCheck, Truck } from 'lucide-react';

// Helper function (can be moved to a utils.js file if you have one)
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// --- Static Hostel Data ---
const hostelNames = [
  'Agira Hall', 'Ambaram Hall', 'Amritam Hall', 'Ananta Hall', 
  'Anantam Hall', 'Dhriti Hall', 'Neeram Hall', 'Prithvi Hall', 
  'Tejas Hall', 'Vahni Hall', 'Viyat Hall', 'Vyan Hall', 'Vyom Hall'
];

// Automatically generate hostel data objects
const hostels = hostelNames.map(name => ({
  name: name,
  // NOTE: You will need to add images to your public folder
  // using this path format, e.g., /images/hostels/agira-hall.jpg
  img: `/images/hostels/${name.toLowerCase().replace(' ', '-')}.jpg`
}));

// --- Static Features Data ---
const features = [
  { 
    name: 'Easy Listings', 
    desc: 'Quickly and easily list your items for sale in just a few steps.',
    icon: PlusCircle 
  },
  { 
    name: 'Secure Payments', 
    desc: 'All transactions are secure, keeping your money and data safe.', 
    icon: ShieldCheck 
  },
  { 
    name: 'Campus-wide Delivery', 
    desc: 'Arrange for easy pickup or delivery right on campus.', 
    icon: Truck 
  },
];


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const backendURL = "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const loadUserAndProducts = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get user email (same as your logic)
        let email = null;
        try {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (storedUser?.email) email = storedUser.email;
        } catch {}
        if (!email) {
          const token = localStorage.getItem("token");
          if (token) {
            const payload = decodeJwtPayload(token);
            if (payload?.email) email = payload.email;
          }
        }
        if (!email) email = localStorage.getItem("userEmail");

        if (!email) {
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch user details
        const userRes = await axios.get(`${backendURL}/api/v1/users/${email}`);
        setUser(userRes.data || null);
        console.log("USER DATA FROM API:", userRes.data);

        // 3️⃣ Fetch all products
        const productRes = await axios.get(`${backendURL}/api/v1/products`);
        const allProductsData = Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data.products || [];

        // 4️⃣ Filter by college domain
        const domain = email.split("@")[1].toLowerCase();
        const sameCollege = allProductsData.filter(
          (p) =>
            p.userEmail &&
            p.userEmail.split("@")[1]?.toLowerCase() === domain
        );

        setAllProducts(sameCollege);
      } catch (err) {
        console.error("Error loading user or products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndProducts();
  }, [backendURL]);

  // Updated filter logic
  const filteredProducts = allProducts.filter((p) => {
    const title = (p.title || p.name || "").toLowerCase();
    
    // Filter by search query
    if (searchQuery && !title.includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected category
    if (selectedCategory && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
    }
    
    return true;
  });

  // Get first 6 recent products
  const recentProducts = filteredProducts.slice(0, 6);
  const scrollContainerRef = useRef(null); // <-- ADD THIS LINE

  // ADD THESE TWO FUNCTIONS
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* You can use your existing loader style */}
        <div className="loader" /> 
      </div>
    );
  }

  return (
    // Use emerald-50 for the light green page background from the design
    <div className="font-poppins min-h-screen bg-emerald-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main>
        <Hero user={user} />
        <Categories 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} 
        />

        {/* --- Hostel Stores Section (Inlined) --- */}
        <div className="py-12 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4">

            {/* --- ADDED: Wrapper for Title + Buttons --- */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Browse by Hostel</h2>
              <div className="flex space-x-2">
                <button
  onClick={() => scroll(-300)} 
  className="p-2 text-gray-800 hover:text-emerald-600 transition" 
  aria-label="Scroll left"
>
                  <ChevronLeft size={24} />
                </button>
                <button
  onClick={() => scroll(-300)} 
  className="p-2 text-gray-800 hover:text-emerald-600 transition" 
  aria-label="Scroll right"
>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            {/* --- MODIFIED: Scroll container --- */}
            <div 
  ref={scrollContainerRef} 
  className="flex overflow-x-auto space-x-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
>
              
              {hostels.map((hostel) => (
                <div
                  key={hostel.name}
  className="w-72 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden 
             hover:shadow-lg transition-shadow duration-300 cursor-pointer"
>
                  <img 
                    src={hostel.img} 
                    alt={hostel.name} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{hostel.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RecentlyListed 
          products={recentProducts} 
          loading={loading} // Pass loading state
        />

        {/* --- Features Section (Inlined) --- */}
        <div className="py-16 px-4 bg-emerald-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center">
                {/* Icon color using emerald-700 (#047857) */}
                <feature.icon className="text-emerald-700 mb-4" size={48} />
                {/* Heading using gray-900 (#111827) */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                {/* Description using gray-800 (#1F2937) */}
                <p className="text-gray-800">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
      </main>

    </div>
  );
};

export default Home;