import React from 'react';
import ProductCard from '../components/ProductCard'; 

const RecentlyListed = ({ products = [], loading = false }) => {
  return (
    // This bg-emerald-50 matches the parent page's background
    <div className="py-12 px-4 bg-emerald-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Recently Listed Items</h1>
          <a href="/all-products" className="text-emerald-700 font-semibold hover:underline">
            See All
          </a>
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // This logic correctly shows a message ONLY if
          // loading is false AND there are no products.
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