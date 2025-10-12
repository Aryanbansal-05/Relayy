import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./SideBar";
import products from "../data/products";
import Header from "../components/Header";
import Navbar from "../Navbar";

const Home_page = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ categories: [], ratings: [] });
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    return products.filter((p) => {
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (
        filters.categories.length &&
        !filters.categories.includes(p.category)
      )
        return false;
      if (filters.ratings.length && !filters.ratings.includes(p.rating))
        return false;
      return true;
    });
  };

  const filteredProducts = applyFilters();

  // ⭐ Helper function to show stars
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

  return (
    <div id="/home" className="font-poppins">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Header title="Campus Marketplace" />
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-800 tracking-wide">
              All Listings
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-55">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col justify-between h-[160px]">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-purple-700">
                      {product.name}
                    </h3>
                    <div className="mt-3">
                      <p className="text-purple-800 font-semibold text-lg">
                        ₹{product.price}
                      </p>

                      {/* ⭐ Display all stars */}
                      <div className="mt-1">{renderStars(product.rating)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center mt-12">
              No products found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home_page;
