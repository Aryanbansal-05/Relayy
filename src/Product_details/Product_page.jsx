import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../Navbar";
import Hero from "./Hero";
import ProductInfo from "./ProductInfo";
import Related from "./Related";
import axios from "axios";

function Product_page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
          </div>

        </div>
      </main>

      {/* --- RELATED PRODUCTS (now with a white background) --- */}
      <section className="bg-white py-12">
        <Related category={product.category} currentProductId={product._id} />
      </section>
    </div>
  );
}

export default Product_page;