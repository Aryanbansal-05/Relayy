import React from 'react';
import Navbar from '../Navbar';
import Products from './products'; // Import the new logic component

const AllProductsPage = () => {
  return (
    <div className="font-poppins min-h-screen bg-emerald-50">
      <Navbar />
      <Products />
    </div>
  );
};

export default AllProductsPage;