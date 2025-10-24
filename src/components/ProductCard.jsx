import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden 
                 flex flex-col h-full
                 hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div 
        className="relative w-full h-56 cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.imageUrls?.[0] || product.image || "/placeholder.jpg"}
          alt={product.title || "Product"}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="text-lg font-semibold text-gray-900 line-clamp-1 mb-2 cursor-pointer hover:text-emerald-700"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.title}
        </h3>
        
        {/* Using emerald-700 (#047857) for price. Note: Your design shows '$' but your old code used '₹'. I'll use '$' to match the design. */}
        <p className="text-emerald-700 font-bold text-2xl mb-2">
          ${product.price}
        </p>
        
        {/* Using gray-800 (#1F2937) for secondary text */}
        <p className="text-sm text-gray-800 mb-4">
          {product.hostel || "Campus Listing"} {/* Add hostel to your product data if possible */}
        </p>

        <div className="mt-auto">
          {/* Button using emerald-100 (#D1FAE5) bg and emerald-800 (#065F46) text */}
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full bg-emerald-100 text-emerald-800 font-semibold py-2 px-4 
                       rounded-md hover:bg-emerald-200 transition-colors duration-200"
          >
            View Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;