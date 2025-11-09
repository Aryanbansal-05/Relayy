import React from 'react';
import { ChevronDown } from 'lucide-react';

// --- Static data (move to a config file later if you want) ---
const categories = ['Electronics', 'Books', 'Furniture', 'Clothing', 'Others'];
const prices = [
  { value: 'under-100', label: 'Under ₹100' },
  { value: '100-500',   label: '₹100 - ₹500' },
  { value: '500-1000',  label: '₹500 - ₹1000' },
  { value: 'over-1000', label: 'Over ₹1000' }
];
const hostels = [
  'Agira Hall', 'Ambaram Hall', 'Amritam Hall', 'Ananta Hall', 
  'Anantam Hall', 'Dhriti Hall', 'Neeram Hall', 'Prithvi Hall', 
  'Tejas Hall', 'Vahni Hall', 'Viyat Hall', 'Vyan Hall', 'Vyom Hall'
];
// ---

// Helper component for a single dropdown
const FilterDropdown = ({ options, value, onChange, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full md:w-auto bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8
                 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      <option value="all">{placeholder}</option>
      {options.map(option => {
        // Check if the option is an object or a simple string
        const isObject = typeof option === 'object' && option !== null && !Array.isArray(option);
        
        // Use object properties if it is an object, otherwise use the string itself
        const optionValue = isObject ? option.value : option;
        const optionLabel = isObject ? option.label : option;

        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
  </div>
);

// Helper component for a single sort button
const SortButton = ({ value, label, sortBy, setSortBy }) => {
  const isActive = sortBy === value;
  return (
    <button
      onClick={() => setSortBy(value)}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors
        ${isActive 
          ? 'bg-emerald-700 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
    >
      {label}
    </button>
  );
};

// --- Main Combined Component ---
const FilterSort = ({ filters, setFilters, sortBy, setSortBy }) => {

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <>
      {/* --- Filter Dropdowns --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FilterDropdown 
          options={categories}
          value={filters.category}
          onChange={(val) => handleFilterChange('category', val)}
          placeholder="Category"
        />
        <FilterDropdown 
          options={prices}
          value={filters.price}
          onChange={(val) => handleFilterChange('price', val)}
          placeholder="Price"
        />
        <FilterDropdown 
          options={hostels}
          value={filters.hostel}
          onChange={(val) => handleFilterChange('hostel', val)}
          placeholder="Hostel"
        />
        <button 
          className="bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg 
                     hover:bg-emerald-800 transition-colors w-full md:w-auto"
        >
          Apply
        </button>
      </div>

      {/* --- Sort Options --- */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-800 font-semibold">Sort by:</span>
        <div className="flex gap-2">
          <SortButton value="newest" label="Newest" sortBy={sortBy} setSortBy={setSortBy} />
          <SortButton value="priceLowToHigh" label="Price: Low to High" sortBy={sortBy} setSortBy={setSortBy} />
          <SortButton value="priceHighToLow" label="Price: High to Low" sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
    </>
  );
};

export default FilterSort;