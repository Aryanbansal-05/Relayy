import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import ProductCard from '../components/ProductCard';
import FilterSort from './FilterSort'; 
import PageNav from './PageNav';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    hostel: 'all',
  });
  
  const [sortBy, setSortBy] = useState('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const backendURL = "https://relayy-backend-9war.onrender.com";

  // ... (Your existing useEffect logic for fetching and filtering/sorting remains exactly the same) ...

  // 1. Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productRes = await axios.get(`${backendURL}/api/v1/products`); 
        const allProductsData = Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data.products || [];
        
        setProducts(allProductsData);
        setFilteredProducts(allProductsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendURL]);

  // 2. Apply filters and sorting
  useEffect(() => {
    let tempProducts = [...products];

    // --- Apply Filtering ---
    
    // Category Filter
    if (filters.category !== 'all') {
      tempProducts = tempProducts.filter(p => 
        p.category && p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Hostel Filter (assuming your product data has a 'hostel' field)
    if (filters.hostel !== 'all') {
      tempProducts = tempProducts.filter(p => 
        p.hostel && p.hostel.toLowerCase() === filters.hostel.toLowerCase()
      );
    }

    // Price Filter
    if (filters.price !== 'all') {
      switch (filters.price) {
        case 'Under $25':
          tempProducts = tempProducts.filter(p => p.price < 25);
          break;
        case '$25 - $50':
          tempProducts = tempProducts.filter(p => p.price >= 25 && p.price <= 50);
          break;
        case '$50 - $100':
          tempProducts = tempProducts.filter(p => p.price >= 50 && p.price <= 100);
          break;
        case 'Over $100':
          tempProducts = tempProducts.filter(p => p.price > 100);
          break;
        default:
          break;
      }
    }

    // --- Apply Sorting ---
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
  }, [products, filters, sortBy]);

  // 3. Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="font-poppins min-h-screen bg-emerald-50">
      <Navbar />

      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Find Your Next Treasure</h1>
        
        {/* --- REPLACE FilterBar and SortOptions --- */}
        <FilterSort 
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {/* --- END OF REPLACEMENT --- */}

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

    </div>
  );
};

export default AllProductsPage;