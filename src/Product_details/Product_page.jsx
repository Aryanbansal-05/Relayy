import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../Navbar";
import Hero from "./Hero";
import ProductInfo from "./ProductInfo";
import Related from "./Related";
import axios from "axios";
import RelayyChat from "../components/RelayyChat";
import { useAuth } from "../Context/AuthContext";
function Product_page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

    // --- NEW STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- NEW AUTH CONTEXT ---
  const { authUser, authToken } = useAuth();
  const backendURL = "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        const res = await axios.get(`${backendURL}/api/v1/products/${id}`);
        setProduct(res.data);
      } catch (err) { // <-- The missing '{' was here
        console.error("❌ Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendURL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-emerald-100">
        <div className="loader"></div>
      </div>
    );

  if (!product)
    return (
      <div className="bg-emerald-100 min-h-screen">
        <Navbar />
        <p className="text-center text-2xl font-semibold mt-20">
          Product not found.
        </p>
      </div>
    );
   const isOwner = authUser && product.userId && authUser._id === product.userId;
  return (
    <div className="bg-emerald-100">
      <Navbar />

      {/* --- NEW TWO-COLUMN LAYOUT --- */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Images */}
          <div>
            <Hero product={product} />
          </div>
          
          {/* Column 2: Info */}
          <div>
            <ProductInfo product={product} />

             {/* Chat Button Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {!isOwner && authUser && (
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl transition-all duration-200 text-lg font-bold shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Chat with Seller
                </button>
              )}

              {!authUser && (
                <div className="text-center">
                  <p className="text-gray-600 mb-3">Please log in to contact the seller</p>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Login to Chat
                  </button>
                </div>
              )}

              {isOwner && (
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700 font-semibold">
                    📦 This is your product listing
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* --- RELATED PRODUCTS (now with a white background) --- */}
      <section className="bg-white py-12">
        <Related category={product.category} currentProductId={product._id} />
      </section>

      {isChatOpen && authUser && product.userId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
            <RelayyChat
              receiverId={product.userId}
              productId={product._id}
              receiverName={product.username}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Product_page;