import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Related = ({ category, currentProductId }) => {
  const navigate = useNavigate();
  
  // --- THIS LOGIC WAS MISSING ---
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:8000";

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) return;
      try {
        setLoading(true);
        const res = await axios.get(`${backendURL}/api/v1/products`);
        const allProducts = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        const filtered = allProducts
          .filter(
            (p) =>
              p.category === category &&
              p._id !== currentProductId &&
              p.imageUrls?.length > 0
          )
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId, backendURL]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  // --- END OF MISSING LOGIC ---

  // --- LOADING / EMPTY STATES ---
  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-800">Loading related items...</p>
      </div>
    );

  if (relatedProducts.length === 0) {
    return null; // Don't show the section if there are no related items
  }

  // --- Main Related Component ---
  return (
    <section className="max-w-6xl mx-auto px-4 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        You might also like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-gray-200"
          >
            <img
              src={product.imageUrls?.[0] || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-36 sm:h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-800 text-sm sm:text-base mt-1">
                ₹{Number(product.price).toFixed(0)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Related;