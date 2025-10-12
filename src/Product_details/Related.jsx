// src/components/Related.jsx
import React from "react";
import { useNavigate } from "react-router";
import products from "../data/products";

const Related = ({ category, currentProductId }) => {
  const navigate = useNavigate();

  // ✅ Filter products strictly from the same category, excluding the current one
  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4); // Optional: show up to 4

  // ✅ Handle click — scroll to top and navigate
  const handleProductClick = (productId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${productId}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  };

  return (
    <section className="mt-12 px-8 mb-5">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
        Related Products
      </h2>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="text-sm text-indigo-900 mt-3 font-medium">
                {product.name}
              </h3>
              <p className="text-purple-700 font-semibold mt-1">
                ₹{product.price.toFixed(2)}
              </p>
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-400 ${
                      index < product.rating ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No related products found.</p>
      )}
    </section>
  );
};

export default Related;
