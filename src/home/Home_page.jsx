import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./SideBar";
import products from "../data/products";
import Header from "../components/Header";
import Navbar from "../Navbar";

/**
 * Helper: decode JWT payload without library (very small, client-side)
 * returns parsed payload object or null
 */
function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    // base64url -> base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
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

  useEffect(() => {
    // Try to read stored user first
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch (e) {
        return null;
      }
    })();

    if (storedUser && storedUser.email) {
      setUser(storedUser);
      filterByCollege(storedUser.email);
      return;
    }

    // If no stored user, try to decode token for email
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeJwtPayload(token);
      if (payload && payload.email) {
        const tokenUser = { email: payload.email, username: payload.username || "" };
        setUser(tokenUser);
        // store for future quick reads
        localStorage.setItem("user", JSON.stringify(tokenUser));
        localStorage.setItem("userEmail", payload.email);
        filterByCollege(payload.email);
        return;
      }
    }

    // As a last fallback, see if userEmail exists separately
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      const fallbackUser = { email: storedEmail };
      setUser(fallbackUser);
      filterByCollege(storedEmail);
      return;
    }

    // No auth info -> redirect to register (or show message)
    setLoading(false);
    // optionally redirect:
    // navigate("/register");
  }, [navigate]);

  const filterByCollege = (email) => {
    setLoading(true);
    const domain = email.split("@")[1];
    // use p.userEmail (your object property)
    const filteredByCollege = products.filter((p) => {
      // guard against missing userEmail
      if (!p.userEmail) return false;
      return p.userEmail.split("@")[1] === domain;
    });
    // small delay to show loader briefly
    setTimeout(() => {
      setCollegeProducts(filteredByCollege);
      setLoading(false);
    }, 300);
  };

  const applyFilters = () => {
    return collegeProducts.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (filters.ratings.length && !filters.ratings.includes(p.rating)) return false;
      return true;
    });
  };

  const filteredProducts = applyFilters();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return (
      <div className="flex text-yellow-500 text-lg">
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );

  return (
    <div id="/home" className="font-poppins">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Header title={user ? ` ${user.email.split("@")[1]}` : "Listings"} />
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 p-8">

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative w-full h-55">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  </div>

                  <div className="p-4 flex flex-col justify-between h-[160px]">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-purple-700">
                      {product.name}
                    </h3>
                    <div className="mt-3">
                      <p className="text-purple-800 font-semibold text-lg">₹{product.price}</p>
                      <div className="mt-1">{renderStars(product.rating)}</div>
                      <p className="text-xs text-gray-400 mt-2">Listed by: {product.username || product.name} ({product.userEmail})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center mt-12">No listings found for your campus yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home_page;
