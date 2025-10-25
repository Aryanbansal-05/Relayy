import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Loader2, Save, UploadCloud, Trash2 } from "lucide-react"; // Import new icons

const EditProduct = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null); // Original data
    const [formData, setFormData] = useState({}); // Form state
    const [preview, setPreview] = useState([]); // Image previews
    const [loading, setLoading] = useState(true); // Page load
    const [isUpdating, setIsUpdating] = useState(false); // Form submit
    const navigate = useNavigate();

    const backendURL = "https://relayy-backend-9war.onrender.com";

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${backendURL}/api/v1/products/${id}`);
                setProductData(res.data);
                setFormData(res.data);
                setPreview(res.data.imageUrls || []);
            } catch (err) {
                console.error("Error loading product:", err);
                alert("Error loading product data.");
                navigate("/profile");
            } finally {
                setLoading(false);
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
        // New files for upload
        setFormData({ ...formData, images: files });
        // New previews
        setPreview(files.map((file) => URL.createObjectURL(file)));
    };
    
    // TODO: Add logic to remove an image from preview/formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            const data = new FormData();
            
            // Append all form data
            Object.keys(formData).forEach((key) => {
                if (key !== "images") data.append(key, formData[key]);
            });

            // Check if new images were added
            if (formData.images && formData.images.length > 0) {
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
            setIsUpdating(false);
        }
    };

    if (loading)
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
            </div>
        );

    return (
        <div className="bg-emerald-50 min-h-screen relative overflow-hidden font-sans">
            

            <div className="relative z-10">
                <Navbar />
                
                {/* Main Content Card */}
                <main className="max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        ✏️ Edit Your Listing
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g., 'Vintage Denim Jacket'"
                                value={formData.title || ""}
                                onChange={handleChange}
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="e.g., 999"
                                value={formData.price || ""}
                                onChange={handleChange}
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Describe your item..."
                                value={formData.description || ""}
                                onChange={handleChange}
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Custom File Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Images</label>
                            <label
                                htmlFor="images"
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-emerald-200 border-dashed rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-10 h-10 mb-3 text-emerald-500" />
                                    <p className="mb-2 text-sm text-emerald-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, or GIF (max 5MB)</p>
                                </div>
                                <input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        
                        {/* Image Previews */}
                        {preview.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-700 mb-2">Image Previews</h3>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                    {preview.map((src, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={src}
                                                alt="Preview"
                                                className="h-32 w-full object-cover rounded-lg border-2 border-emerald-100"
                                            />
                                            <button 
                                                type="button"
                                                // TODO: Add onClick to remove this image
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition shadow-md transform hover:scale-105 disabled:opacity-70"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Update Listing
                                </>
                            )}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default EditProduct;
