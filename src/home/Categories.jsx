import React from 'react';
import { Package, Book, Sofa, Shirt, Dices } from 'lucide-react'; // Example icons

const categories = [
  { name: 'Electronics', icon: Package, color: 'bg-teal-400' },
  { name: 'Textbooks', icon: Book, color: 'bg-blue-400' },
  { name: 'Furniture', icon: Sofa, color: 'bg-purple-400' },
  { name: 'Clothing', icon: Shirt, color: 'bg-lime-400' },
  { name: 'Hobbies', icon: Dices, color: 'bg-orange-400' },
];

// Receives state and setter from Home.jsx
const Categories = ({ selectedCategory, setSelectedCategory }) => {
  
  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Toggle off if clicked again
    } else {
      setSelectedCategory(categoryName);
    }
  };
  
  return (
    <div className="py-12 px-4 bg-emerald-50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className={`
              ${cat.color} text-white font-semibold p-6 rounded-lg 
              flex flex-col items-center justify-center 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1 
              transition-all duration-300
              ${selectedCategory === cat.name ? 'ring-4 ring-offset-2 ring-emerald-700' : ''}
            `}
          >
            <cat.icon size={32} className="mb-2" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;