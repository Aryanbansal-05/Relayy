// src/Product_details/Product_page.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../Navbar";
import Header from "../components/Header";
import Hero from "./Hero";
import Description from "./Description";
import Related from "./Related";
import axios from "axios";

function Product_page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Auto backend switch
const backendURL = "https://relayy-backend-9war.onrender.com";


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendURL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );

  if (!product)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found.
      </p>
    );

  return (
    <>
      <Navbar />
      <Header title="Product Details" />
      <Hero product={product} />
      <Description product={product} />
      <Related category={product.category} currentProductId={product._id} />
    </>
  );
}

export default Product_page;
