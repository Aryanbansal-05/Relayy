import React from 'react';
import Navbar from '../Navbar'; 
import { useNavigate } from 'react-router-dom';

// --- Static Hostel Data ---
const hostelNames = [
  'Agira Hall', 'Ambaram Hall', 'Amritam Hall', 'Ananta Hall', 
  'Anantam Hall', 'Dhriti Hall', 'Neeram Hall', 'Prithvi Hall', 
  'Tejas Hall', 'Vahni Hall', 'Viyat Hall', 'Vyan Hall', 'Vyom Hall'
];

// Automatically generate hostel data objects
const hostels = hostelNames.map(name => ({
  name: name,
  // Assumes image paths like /images/hostels/agira-hall.jpg
  img: `/images/hostels/${name.toLowerCase().replace(' ', '-')}.jpg`,
  // Value to be used in the URL path
  pathValue: name.toLowerCase().replace(' ', '-')
}));

const HostelStoresPage = () => {
  const navigate = useNavigate();

  // This function will run when a hostel card is clicked
  const handleHostelClick = (hostelPath) => {
    // Navigates to a dynamic route, e.g., "/hostel/agira-hall"
    navigate(`/hostel/${hostelPath}`);
  };

  return (
    <div className="font-poppins min-h-screen bg-emerald-50">
      <Navbar /> {/* Assuming Navbar doesn't need search props here */}
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Browse by Hostel
          </h1>
          
          {/* Hostel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostels.map((hostel) => (
              <div
                key={hostel.name}
                className="bg-white rounded-lg shadow-md overflow-hidden 
                           hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleHostelClick(hostel.pathValue)}
              >
                <img 
                  src={hostel.img} 
                  alt={hostel.name} 
                  className="w-full h-48 object-cover bg-gray-200" // Added bg-gray-200 as placeholder
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-800">{hostel.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HostelStoresPage;