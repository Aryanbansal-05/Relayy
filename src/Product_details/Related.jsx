// src/components/Related.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Related = ({ category, currentProductId }) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendURL}/api/v1/products`);
        const allProducts = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        // ✅ Filter products by category & exclude current product
        const filtered = allProducts
          .filter(
            (p) =>
              p.category === category &&
              p._id !== currentProductId &&
              p.imageUrls?.length > 0
          )
          .slice(0, 4); // show up to 4 related products

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchRelatedProducts();
  }, [category, currentProductId, backendURL]);

  // ✅ Handle navigation + scroll
  const handleProductClick = (productId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${productId}`);
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 my-10">
        Loading related products...
      </div>
    );

  return (
    <section className="mt-12 px-8 mb-5 font-poppins">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
        Related Products
      </h2>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer p-4 border border-gray-100"
            >
              <img
                src={product.imageUrls?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="text-sm text-indigo-900 mt-3 font-medium line-clamp-1">
                {product.title}
              </h3>
              <p className="text-purple-700 font-semibold mt-1">
                ₹{Number(product.price).toFixed(2)}
              </p>

              {/* ⭐ Rating */}
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-400 ${
                      index < Math.round(product.rating || 0)
                        ? "opacity-100"
                        : "opacity-30"
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
