import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const Hero = () => {
  const [hostel, setHostel] = useState('');

  return (
    // RESTORED: The main curve (rounded-3xl) and margin (m-4).
    // ADDED: Gradient from emerald-700 to emerald-900.
    // ADDED: Increased vertical padding (py-24) for a longer section.
    <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white 
                    py-24 md:py-32 text-center shadow-lg 
                    rounded-3xl m-4"> {/* Kept the curve and margin */}
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Your Campus Marketplace for Awesome Finds
      </h1>
      <p className="text-lg md:text-xl text-emerald-100 mb-10">
        Select your hostel to start exploring.
      </p>

      {/* REMOVED the inner box (bg-black/20...) that was around this flex container */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto px-4">
        
        <div className="relative w-full md:w-2/3">
          {/* Icon styling */}
          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900" size={20} />
          
          {/* Select box styling */}
          <select
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg 
                       bg-emerald-100 text-gray-900 
                       border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select your hostel</option>
            <option value="gandhi">Agira Hall </option>
            <option value="nehru">Ambaram Hall </option>
            <option value="tagore">Amritam Hall </option>
            <option value="azad">Ananta Hall </option>
            <option value="azad">Anantam Hall </option>
            <option value="azad">Dhriti Hall </option>
            <option value="azad">Neeram Hall </option>
            <option value="azad">Prithvi Hall </option>
            <option value="azad">Tejas Hall </option>
            <option value="azad">Vahni Hall </option>
            <option value="azad">Viyat Hall </option>
            <option value="azad">Vyan Hall </option>
            <option value="azad">Vyom Hall </option>
          </select>
        </div>
        
        {/* Button styling */}
        <button className="w-full md:w-auto bg-emerald-900 hover:bg-black text-white font-semibold 
                           px-8 py-3 rounded-lg shadow-md transition-colors duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;