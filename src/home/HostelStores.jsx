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
  const handleHostelClick = (hostelName) => {
    // This creates the URL: /all-products?category=Electronics
    navigate(`/all-products?userHostel=${hostelName}`);
  };

  const scrollContainerRef = useRef(null); // <-- 3. Create the ref


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
    <section className="py-8 sm:py-12 px-4"> 
      <div className="max-w-6xl mx-auto">
        
        {/* --- 5. Title and Scroll Buttons --- */}
        <div className="flex justify-between items-center mb-6 sm:mb-8"> 
          {/* Smaller Title: text-2xl on mobile, text-3xl on small screens, text-4xl on medium+ */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Browse by Hostel
          </h1>
          
          {/* Scroll buttons hidden on mobile (md:flex ensures they show on desktop) */}
          <div className="hidden md:flex space-x-2">
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
          // Tighter spacing on mobile (space-x-4)
          className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {hostels.map((hostel) => (
            <div
              key={hostel.name}
              // CRITICAL FIX: Card width significantly reduced. 
              // w-[50vw] on mobile (show two partial cards) or w-40 (fixed, small size). 
              // Let's use **w-40** (160px) for a much smaller, fixed-size card.
              className="w-40 sm:w-48 md:w-72 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden 
                         hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleHostelClick(hostel.name)}
            >
              {/* Image height dramatically reduced to make the card shorter */}
              <img 
                src={hostel.img} 
                alt={hostel.name} 
                className="w-full h-28 sm:h-36 md:h-48 object-cover bg-gray-200"
                loading="lazy"
              />
              {/* Reduced padding and font size for a small, compact look */}
              <div className="p-2 text-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">{hostel.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll hint visible only on mobile */}
        <p className="text-center text-sm text-gray-500 mt-4 md:hidden">
            ← Scroll horizontally to see more hostels →
        </p>
        
      </div>
    </section>
  );
};

export default HostelStores;