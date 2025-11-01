import React, { useRef } from 'react'; // <-- 1. Import useRef
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // <-- 2. Import icons

// --- Single Source of Truth ---
const hostelData = [
  { name: 'Agira Hall',   imageFile: 'agirahall.jpg' },
  { name: 'Ambaram Hall', imageFile: 'ambaramhall.jpg' },
  { name: 'Amritam Hall', imageFile: 'amritamhall.jpg' },
  { name: 'Ananta Hall',  imageFile: 'anantahall.jpg' },
  { name: 'Anantam Hall', imageFile: 'anantamhall.jpg' },
  { name: 'Dhriti Hall',  imageFile: 'dhritihall.jpg' },
  { name: 'Neeram Hall',  imageFile: 'neeramhall.jpg' },
  { name: 'Prithvi Hall', imageFile: 'prithvihall.jpg' },
  { name: 'Tejas Hall',   imageFile: 'tejashall.png' },
  { name: 'Vahni Hall',   imageFile: 'vahnihall.jpeg' },
  { name: 'Viyat Hall',   imageFile: 'viyathall.jpeg' },
  { name: 'Vyan Hall',    imageFile: 'vyanhall.png' },
  { name: 'Vyom Hall',    imageFile: 'vyomhall.png' }
];

// Automatically generate hostel data objects
const hostels = hostelData.map(hostel => {
  return {
    name: hostel.name,
    img: `/hostels/${hostel.imageFile}`, // This path is correct
    pathValue: hostel.name.toLowerCase().replace(' ', '-')
  };
});

const HostelStores = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // <-- 3. Create the ref

  const handleHostelClick = (hostelPath) => {
    navigate(`/hostel/${hostelPath}`);
  };

  // <-- 4. Create the scroll function
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ 
        left: scrollOffset, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* --- 5. Title and Scroll Buttons --- */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Browse by Hostel
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll(-300)}
              className="p-2 rounded-full bg-white shadow-md text-gray-800 hover:bg-gray-100 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(300)}
              className="p-2 rounded-full bg-white shadow-md text-gray-800 hover:bg-gray-100 transition"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* --- 6. The Scrollable Container --- */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {hostels.map((hostel) => (
            <div
              key={hostel.name}
              // --- 7. Set fixed width and prevent shrinking ---
              className="w-72 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden 
                         hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleHostelClick(hostel.pathValue)}
            >
              <img 
                src={hostel.img} 
                alt={hostel.name} 
                className="w-full h-48 object-cover bg-gray-200"
                loading="lazy"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">{hostel.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostelStores;