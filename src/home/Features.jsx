import React from 'react';

// Icons for the features section
import { PlusCircle, ShieldCheck, Truck } from 'lucide-react';

// --- Static Features Data ---
// This data is now part of the Features component
const features = [
  { 
    name: 'Easy Listings', 
    desc: 'Quickly and easily list your items for sale in just a few steps.',
    icon: PlusCircle 
  },
  { 
    name: 'Secure Payments', 
    desc: 'All transactions are secure, keeping your money and data safe.', 
    icon: ShieldCheck 
  },
  { 
    name: 'Campus-wide Delivery', 
    desc: 'Arrange for easy pickup or delivery right on campus.', 
    icon: Truck 
  },
];

const Features = () => {
  return (
    <div className="py-16 px-4 bg-emerald-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col items-center">
            {/* Icon color using emerald-700 (#047857) */}
            <feature.icon className="text-emerald-700 mb-4" size={48} />
            {/* Heading using gray-900 (#111827) */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
            {/* Description using gray-800 (#1F2937) */}
            <p className="text-gray-800">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;