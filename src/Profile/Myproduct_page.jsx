import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";

const Myproduct_page = () => {
  const { id } = useParams(); // product ID from URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Product not found!");
        navigate("/profile");
      }
    };
    fetchProduct();
  }, [id, backendURL, navigate]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );

  return (
    <div className="font-josefin bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Product Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 grid md:grid-cols-2 gap-6">
          {/* Image section */}
          <div className="space-y-4">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              product.imageUrls.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.title}
                  className="rounded-lg w-full object-cover"
                />
              ))
            ) : (
              <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 className="text-3xl font-semibold text-purple-800 mb-2">
              {product.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-purple-700 font-bold text-xl mb-2">
              ₹{product.price}
            </p>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>

            <button
              onClick={() => navigate(`/edit/${product._id}`)}
              className="bg-purple-700 text-white px-5 py-2 rounded-md hover:bg-purple-800 transition"
            >
              ✏️ Edit This Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myproduct_page;
