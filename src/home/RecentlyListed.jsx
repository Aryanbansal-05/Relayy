import React from 'react';
import ProductCard from '../components/ProductCard'; // Imports the new ProductCard

const RecentlyListed = ({ products, loading }) => {
  return (
    <div className="py-12 px-4 bg-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {/* Using gray-900 (#111827) for heading */}
          <h2 className="text-3xl font-bold text-gray-900">Recently Listed Items</h2>
          {/* Using emerald-700 (#047857) for link */}
          <a href="/all-products" className="text-emerald-700 font-semibold hover:underline">
            See All
          </a>
        </div>
        
        {/* This component doesn't need its own loader if Home.jsx already has one */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // Show this message only if not loading and no products
          !loading && (
            <p className="text-gray-500 text-lg text-center mt-12">
              No listings found for your campus yet.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default RecentlyListed;