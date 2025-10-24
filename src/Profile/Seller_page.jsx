// src/pages/SellerPage.jsx
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { X } from "lucide-react"; // icon for removing images
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SellerPage = () => {
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

const backendURL = "https://relayy-backend-9war.onrender.com";


  /* ------------------------- handle input changes ------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------------- handle image selection ------------------------ */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allImages = [...formData.images, ...files].slice(0, 4); // limit 4
    setFormData((prev) => ({ ...prev, images: allImages }));

    const imagePreviews = allImages.map((file) => URL.createObjectURL(file));
    setPreview(imagePreviews);
  };

  /* ------------------------- remove selected image ------------------------- */
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = preview.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
    setPreview(newPreviews);
  };

  /* --------------------------- handle submit ------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category) {
      return alert("Please fill all required fields");
    }

    if (formData.images.length === 0) {
      return alert("Please upload at least one image");
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "images") data.append(key, formData[key]);
      });
      formData.images.forEach((img) => data.append("images", img));

      const token =
        Cookies.get("auth_token") || localStorage.getItem("token") || "";

      const res = await axios.post(`${backendURL}/api/v1/products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert("✅ Product listed successfully!");
      navigate("/profile"); // redirect to seller profile or home
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to list product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-josefin bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          🛍️ List Your Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="Enter product title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Upload Images (max 4)
            </label>
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
                  <div
                    key={idx}
                    className="relative h-32 w-full border rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800"
          >
            {loading ? "Listing..." : "List Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerPage;
