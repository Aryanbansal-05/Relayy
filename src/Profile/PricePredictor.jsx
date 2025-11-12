// src/components/PricePredictor.jsx
import React, { useState } from "react";
import Navbar from "../Navbar";

const BACKEND_URL = "https://relayy-backend-9war.onrender.com"; // change if needed

const MOBILE_BRANDS = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Realme",
  "Vivo",
  "Oppo",
  "Google",
  "Motorola",
  "Nothing",
];

const defaultForm = {
  brand: "",
  model: "",
  ram: "",
  storage: "",
  condition: "",
  age_years: "",
  original_price: "",
};

export default function PricePredictor() {
  const [form, setForm] = useState({ ...defaultForm });
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setPrice(null);
  };

  const validateForm = () => {
    const required = [
      "brand",
      "model",
      "ram",
      "storage",
      "condition",
      "age_years",
      "original_price",
    ];
    for (const key of required) {
      if (!form[key] || String(form[key]).trim() === "") {
        return `Please fill the ${key.replace("_", " ")} field.`;
      }
    }
    if (Number(form.ram) <= 0) return "RAM must be positive.";
    if (Number(form.storage) <= 0) return "Storage must be positive.";
    if (Number(form.age_years) < 0) return "Age must be 0 or greater.";
    if (Number(form.original_price) <= 0)
      return "Original price must be positive.";
    return null;
  };

  const handlePredict = async () => {
    setPrice(null);
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        category: "electronics",
        type: "mobile",
        brand: form.brand,
        model: form.model,
        ram: Number(form.ram),
        storage: Number(form.storage),
        condition: form.condition,
        age_years: Number(form.age_years),
        original_price: Number(form.original_price),
      };

      const res = await fetch(`${BACKEND_URL}/api/price/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      if (data?.success && typeof data.predictedPrice !== "undefined") {
        const rounded = Math.round(Number(data.predictedPrice));
        setPrice(rounded);
      } else {
        setError(data?.error || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ ...defaultForm });
    setPrice(null);
    setError("");
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 sm:p-8 font-sans">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-emerald-700">Resale Price Predictor</h2>
        <p className="mt-1 text-sm text-gray-600">Estimate a fair resale value for your Product.</p>
      </div>

      {/* Brand + Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <select
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Select Brand</option>
            {MOBILE_BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Type model name manually (e.g. iPhone 14)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {/* RAM + Storage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-2">RAM (GB)</label>
          <input
            id="ram"
            name="ram"
            type="number"
            min="1"
            value={form.ram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="e.g. 8"
          />
        </div>

        <div>
          <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-2">Storage (GB)</label>
          <input
            id="storage"
            name="storage"
            type="number"
            min="1"
            value={form.storage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="e.g. 128"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="mt-4">
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
        <select
          id="condition"
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <option value="">Select Condition</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      {/* Age + Original Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="age_years" className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
          <input
            id="age_years"
            name="age_years"
            type="number"
            min="0"
            step="0.1"
            value={form.age_years}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="e.g. 1.5"
          />
        </div>

        <div>
          <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
          <input
            id="original_price"
            name="original_price"
            type="number"
            min="1"
            value={form.original_price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="e.g. 45000"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handlePredict}
          disabled={loading}
          className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold transition ${
            loading ? "bg-emerald-300 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
          }`}
        >
          {loading ? "Predicting…" : "Predict Resale Price"}
        </button>

        <button
          onClick={handleReset}
          type="button"
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        {price !== null && (
          <div className="mx-auto w-full rounded-lg bg-emerald-50 border border-emerald-100 py-4 px-5 text-center">
            <div className="text-sm text-emerald-700">Predicted Price</div>
            <div className="mt-1 text-2xl font-bold text-emerald-800">₹{price.toLocaleString()}</div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-100 text-red-700 p-3">
            {error}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
