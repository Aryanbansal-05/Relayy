import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Loader2, PlusCircle, UploadCloud, X } from "lucide-react"; // Updated icons
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
    // --- New state for drag-and-drop visual feedback ---
    const [isDragging, setIsDragging] = useState(false);

    const backendURL = "https://relayy-backend-9war.onrender.com";

    /* ------------------------- handle input changes ------------------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- Unified function to handle files from click OR drop ---
    const processFiles = (files) => {
        const currentImageCount = formData.images.length;
        const remainingSlots = 4 - currentImageCount;
        const filesToAdd = files.slice(0, remainingSlots); // Only take up to 4 total

        if (filesToAdd.length > 0) {
            const allImages = [...formData.images, ...filesToAdd];
            setFormData((prev) => ({ ...prev, images: allImages }));

            const imagePreviews = allImages.map((file) => {
                return typeof file === 'string' ? file : URL.createObjectURL(file);
            });
            setPreview(imagePreviews);
        }
        
        if (files.length > remainingSlots) {
            alert(`You can only upload a maximum of 4 images. ${remainingSlots} slots were remaining.`);
        }
    };

    /* ------------------------- handle image selection (click) ---------------- */
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
        // Reset the input value so the same file can be selected again if removed
        e.target.value = null; 
    };

    /* ------------------------- handle drag-and-drop events ------------------- */
    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault(); // Prevent browser from opening the file
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files); // Get files from the drop event
        processFiles(files); // Use the same processing logic
    };

    /* ------------------------- remove selected image ------------------------- */
    const removeImage = (index) => {
        // Revoke the object URL to free up memory
        const objectUrl = preview[index];
        if (objectUrl.startsWith('blob:')) {
            URL.revokeObjectURL(objectUrl);
        }
        
        const newImages = formData.images.filter((_, i) => i !== index);
        const newPreviews = preview.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, images: newImages }));
        setPreview(newPreviews);
    };

    /* --------------------------- handle submit ------------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.category) {
            return alert("Please fill all required fields (Title, Price, Category)");
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

            await axios.post(`${backendURL}/api/v1/products`, data, {
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
        <div className="bg-emerald-50 min-h-screen relative overflow-hidden font-sans">
            {/* Background pattern removed as requested */}
            {/* <div className="absolute inset-0 z-0 opacity-40">...</div> */}

            <div className="relative z-10"> {/* Removed relative z-10 */}
                <Navbar />
                
                {/* Main Content Card */}
                <main className="max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
                        <PlusCircle className="w-8 h-8 mr-3 text-emerald-600"/>
                        List Your Item
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g., 'Vintage Denim Jacket'"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="e.g., 999"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white appearance-none"
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Books">Books</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Describe your item..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border-2 border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                            />
                        </div>

                        {/* Custom File Input / Dropzone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Images (Max 4) <span className="text-red-500">*</span></label>
                            <label
                                htmlFor="images"
                                onDragOver={handleDragOver} // <-- Added
                                onDragLeave={handleDragLeave} // <-- Added
                                onDrop={handleDrop} // <-- Added
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                                    ${isDragging ? 'border-emerald-500 bg-emerald-100' : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'}
                                `} // <-- Added dynamic styling
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-emerald-600' : 'text-emerald-500'}`} />
                                    <p className={`mb-2 text-sm ${isDragging ? 'text-emerald-700' : 'text-emerald-700'}`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, or GIF (max 5MB)</p>
                                </div>
                                <input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        
                        {/* Image Previews */}
                        {preview.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-700 mb-2">Image Previews</h3>
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                    {preview.map((src, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={src}
                                                alt={`Preview ${idx + 1}`}
                                                className="h-32 w-full object-cover rounded-lg border-2 border-emerald-100"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition shadow-md transform hover:scale-105 disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Listing...
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    List Product
                                </>
                            )}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default SellerPage;

