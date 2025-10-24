import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const Hero = ({ user }) => { 
  const [hostel, setHostel] = useState('');

  let collegeName = "Your Campus"; 
  if (user?.email) {
    try {
      const emailDomain = user.email.split('@')[1]; 
      const collegePart = emailDomain.split('.')[0]; 
      collegeName = collegePart.charAt(0).toUpperCase() + collegePart.slice(1);
    } catch (e) {
      console.error("Could not parse college from email:", e);
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white 
                   py-24 md:py-32 text-center shadow-lg 
                   rounded-3xl m-4">
      
      {collegeName !== "Your Campus" && (
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Welcome to {collegeName}
        </h2>
      )}
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        The Campus Marketplace for Awesome Finds
      </h1>
      
      <p className="text-lg md:text-xl text-emerald-100 mb-10">
        Select your hostel to start exploring.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto px-4">
        
        <div className="relative w-full md/w-2/3">
          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900" size={20} />
          
          <select
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg 
                       bg-emerald-100 text-gray-900 
                       border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select your hostel</option>
            <option value="agira-hall">Agira Hall </option>
            <option value="ambaram-hall">Ambaram Hall </option>
            <option value="amritam-hall">Amritam Hall </option>
            <option value="ananta-hall">Ananta Hall </option>
            <option value="anantam-hall">Anantam Hall </option>
            <option value="dhriti-hall">Dhriti Hall </option>
            <option value="neeram-hall">Neeram Hall </option>
            <option value="prithvi-hall">Prithvi Hall </option>
            <option value="tejas-hall">Tejas Hall </option>
            <option value="vahni-hall">Vahni Hall </option>
            <option value="viyat-hall">Viyat Hall </option>
            <option value="vyan-hall">Vyan Hall </option>
            <option value="vyom-hall">Vyom Hall </option>
          </select>
        </div>
        
        {/* --- MODIFIED THIS BUTTON --- */}
        <button className="w-full md:w-auto bg-emerald-900 hover:bg-black text-white font-semibold 
                           px-8 py-3 rounded-lg shadow-md transition-colors duration-300
                           whitespace-nowrap"> {/* <-- ADDED THIS CLASS */}
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;