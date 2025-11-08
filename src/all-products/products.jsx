import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterSort from './FilterSort'; 
import PageNav from './PageNav';

// 🔑 NEW: Helper function to decode JWT payload
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const ProductBrowser = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all'; 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔑 NEW: State to store the current user's college domain
  const [userDomain, setUserDomain] = useState(null); 
  
  const [filters, setFilters] = useState({
    category: categoryFromUrl, 
    price: 'all',
    hostel: 'all',
  });
  
  const [sortBy, setSortBy] = useState('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const backendURL = "https://relayy-backend-9war.onrender.com";

  // 🔑 NEW: useEffect to get user email and domain from local storage/token
  useEffect(() => {
    let email = null;
    try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.email) email = storedUser.email;
    } catch {}
    if (!email) {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = decodeJwtPayload(token);
            if (payload?.email) email = payload.email;
        }
    }
    if (!email) email = localStorage.getItem("userEmail");

    if (email) {
        // Extract the domain (e.g., 'college.edu')
        const domain = email.split("@")[1]?.toLowerCase();
        setUserDomain(domain);
    }
  }, []); // Runs only on mount to set the domain

  // 1. Fetch all products on mount (Existing logic - NO CHANGES NEEDED HERE)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productRes = await axios.get(`${backendURL}/api/v1/products`); 
        const allProductsData = Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data.products || [];
        
        setProducts(allProductsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendURL]);

  // 2. Apply filters and sorting (MAJOR UPDATE HERE)
  useEffect(() => {
    let tempProducts = [...products];

    // 🔑 NEW: MANDATORY CAMPUS FILTER
    // Only proceed with filtering if we know the user's domain
    if (userDomain) {
        tempProducts = tempProducts.filter(p => 
            // Assumes 'p.userEmail' is available on the product object
            p.userEmail && 
            p.userEmail.split("@")[1]?.toLowerCase() === userDomain
        );
    }
    // Note: If userDomain is null, tempProducts remains ALL products, 
    // but the intention is that this should always run for logged-in users.
    
    // --- Apply User-Selected Filtering ---
    
    // Category Filter (Existing logic)
    if (filters.category !== 'all') {
      tempProducts = tempProducts.filter(p => 
        p.category && p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Hostel Filter (Existing logic)
    if (filters.hostel !== 'all') {
      tempProducts = tempProducts.filter(p => 
        p.hostel && p.hostel.toLowerCase() === filters.hostel.toLowerCase()
      );
    }

    // Price Filter (Existing logic)
    if (filters.price !== 'all') {
      tempProducts = tempProducts.filter(p => {
        const price = p.price;
        switch (filters.price) {
          case 'under-100':
            return price < 100;
          case '100-500':
            return price >= 100 && price <= 500;
          case '500-1000':
            return price >= 500 && price <= 1000;
          case 'over-1000':
            return price > 1000;
          default:
            return true;
        }
      });
    }

    // --- Apply Sorting (Existing Logic) ---
    if (sortBy === 'priceLowToHigh') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (tempProducts.length > 0 && tempProducts[0].createdAt) { 
      // Default to 'newest'
      tempProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredProducts(tempProducts);
    setCurrentPage(1); // Reset page to 1 after any filter/sort change
  }, [products, filters, sortBy, userDomain]); // ⚠️ IMPORTANT: Added userDomain

  // 3. Pagination Logic (Existing logic)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Find Your Next Treasure</h1>
      
      {/* --- Filter and Sort --- */}
      <FilterSort 
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
      {/* PageNav */}
      <PageNav
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </main>
  );
};

export default ProductBrowser;