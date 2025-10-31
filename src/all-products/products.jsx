import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterSort from './FilterSort'; 
import PageNav from './PageNav';

const ProductBrowser = () => {
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
  const productsPerPage = 16;

  const backendURL = "https://relayy-backend-9war.onrender.com";

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

    // Hostel Filter
    if (filters.hostel !== 'all') {
      tempProducts = tempProducts.filter(p => 
        p.hostel && p.hostel.toLowerCase() === filters.hostel.toLowerCase()
      );
    }

    // Price Filter
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