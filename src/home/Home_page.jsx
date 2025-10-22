// src/pages/Home_page.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "../components/Header";
import Navbar from "../Navbar";
import axios from "axios";

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

const Home_page = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ categories: [], ratings: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [collegeProducts, setCollegeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const loadUserAndProducts = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get user email
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

        // 2️⃣ Fetch user details (for college name)
        const userRes = await axios.get(`${backendURL}/api/v1/users/${email}`);
        const userData = userRes.data || {};
        const collegeName = userData.college || "Your College";

        const userObj = { ...userData, email, college: collegeName };
        setUser(userObj);

        // 3️⃣ Fetch all products
        const productRes = await axios.get(`${backendURL}/api/v1/products`);
        const allProducts = Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data.products || [];

        // 4️⃣ Filter by college domain
        const domain = email.split("@")[1].toLowerCase();
        const sameCollege = allProducts.filter(
          (p) =>
            p.userEmail &&
            p.userEmail.split("@")[1]?.toLowerCase() === domain
        );

        setCollegeProducts(sameCollege);
      } catch (err) {
        console.error("Error loading user or products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndProducts();
  }, [backendURL]);

  const applyFilters = () =>
    collegeProducts.filter((p) => {
      const title = (p.title || p.name || "").toLowerCase();
      if (searchQuery && !title.includes(searchQuery.toLowerCase())) return false;
      if (filters.categories?.length && !filters.categories.includes(p.category))
        return false;
      if (
        filters.ratings?.length &&
        !filters.ratings.includes(Math.round(p.rating || 0))
      )
        return false;
      return true;
    });

  const filteredProducts = applyFilters();

  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const hasHalf = (rating || 0) % 1 !== 0;
    const empty = 5 - Math.ceil(rating || 0);
    return (
      <div className="flex text-yellow-500 text-lg">
        {"★".repeat(full)}
        {hasHalf && "☆"}
        {"☆".repeat(empty)}
      </div>
    );
  };
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader" />
      </div>
    );

  return (
    <div id="/home" className="font-poppins min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Header
        title={
          user?.college
            ? `${user.college}`
            : "Your College Listings"
        }
      />

      <div className="flex">
        <Sidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 p-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative w-full h-55">
                    <img
                      src={
                        product.imageUrls?.[0] ||
                        product.image ||
                        "/placeholder.jpg"
                      }
                      alt={product.title || "Product"}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between h-[160px]">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-purple-700">
                      {product.title}
                    </h3>
                    <div className="mt-3">
                      <p className="text-purple-800 font-semibold text-lg">
                        ₹{product.price}
                      </p>
                      <div className="mt-1">{renderStars(product.rating)}</div>
                      <p className="text-xs text-gray-400 mt-2">
                        Listed by: {product.username || "Unknown"} (
                        {product.userEmail})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center mt-12">
              No listings found for your campus yet.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home_page;
