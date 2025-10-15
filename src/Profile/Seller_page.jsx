import React, { useState } from "react";
import Navbar from "../Navbar";

const Seller_page = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item submitted:", formData);
    alert("Your item has been listed for sale!");
  };

  return (
    <div className="font-josefin bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          List an Item for Sale
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <input
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Publish Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Seller_page;
