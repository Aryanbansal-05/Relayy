import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const backendURL = "https://relayy-backend-9war.onrender.com";


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/products/${id}`);
        setProductData(res.data);
        setFormData(res.data);
        setPreview(res.data.imageUrls || []);
      } catch (err) {
        console.error("Error loading product:", err);
        alert("Error loading product data.");
        navigate("/profile");
      }
    };
    fetchProduct();
  }, [id, backendURL, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "images") data.append(key, formData[key]);
      });
      if (formData.images) {
        formData.images.forEach((img) => data.append("images", img));
      }

      await axios.put(`${backendURL}/api/v1/products/${id}`, data, {
        withCredentials: true,
      });

      alert("✅ Ad updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating ad:", err);
      alert("❌ Failed to update ad.");
    } finally {
      setLoading(false);
    }
  };

  if (!productData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="font-josefin bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          ✏️ Edit Your Ad
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="price"
            placeholder="Price (₹)"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          {preview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800"
          >
            {loading ? "Updating..." : "Update Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
