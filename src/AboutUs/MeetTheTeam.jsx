import React from 'react';
import { Linkedin, Github } from 'lucide-react';

// This component contains the 4-member team grid
const MeetTheTeam = () => {
    return (
        <section className="py-24 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-display text-4xl font-bold text-center text-gray-900 mb-16">
              Meet the Team
            </h2>
            
            {/* 4-Member Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            
              {/* --- Team Member 1 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src="https://placehold.co/300x300/D1FAE5/065F46?text=Team+Member"
                  alt="Team Member 1"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Member Name</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Role</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  A short bio about the member's role and passion for the project.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

              {/* --- Team Member 2 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src="https://placehold.co/300x300/A7F3D0/065F46?text=Team+Member"
                  alt="Team Member 2"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Member Name</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Role</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  A short bio about the member's role and passion for the project.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

              {/* --- Team Member 3 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src="https://placehold.co/300x300/6EE7B7/065F46?text=Team+Member"
                  alt="Team Member 3"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Member Name</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Role</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  A short bio about the member's role and passion for the project.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

              {/* --- Team Member 4 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src="https://placehold.co/300x300/34D399/065F46?text=Team+Member"
                  alt="Team Member 4"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Member Name</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Role</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  A short bio about the member's role and passion for the project.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

            </div>
          </div>
        </section>
    );
};

export default MeetTheTeam;