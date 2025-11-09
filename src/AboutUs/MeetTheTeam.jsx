import React from 'react';
import { Linkedin, Github } from 'lucide-react';

import yajatImage from './yajat.jpg'; 
import aryanImage from './aryan.jpg'; 
import safalImage from './safal.jpg';
import saanchiImage from './saanchi.jpg';

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
                  src={yajatImage}
                  alt="Team Member 1"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Yajat Kumar Bharaj</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">AI/ML Model Specialist</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  Responsible for developing and maintaining the AI/ML models, specifically the accurate price prediction model for all listed items
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
                  src={aryanImage}
                  alt="Team Member 2"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Aryan Bansal</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Full-Stack Developer</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  Drives development with a focus on system architecture, implementing reliable, high-performance engines and core application functionalities.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="https://www.linkedin.com/in/aryan-bansal-44a2a6260?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="http://Github.com/aryanbansal-05" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

              {/* --- Team Member 3 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src={safalImage}
                  alt="Team Member 3"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Safal Kaur</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Full-Stack Developer</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  Specializes in optimizing design translation and crafting the intuitive, responsive experience that users interact with directly.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="https://www.linkedin.com/in/safal-kaur-67379727a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="https://github.com/safalkaur03" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

              {/* --- Team Member 4 --- */}
              <div className="text-center group">
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-5 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src={saanchiImage}
                  alt="Team Member 4"
                />
                <h3 className="font-display text-2xl font-bold text-gray-900">Saanchi Gupta</h3>
                <p className="font-sans text-md text-emerald-700 font-medium">Chat System Engineer</p>
                <p className="font-sans text-gray-600 text-sm mt-2">
                  Manages the real-time chat function using Socket.IO, ensuring fast, reliable, and low-latency communication between users.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a href="https://www.linkedin.com/in/saanchi-gupta-9711942a8/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                  <a href="https://github.com/saanchigupta/" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-gray-500 hover:text-emerald-600 transition-colors" /></a>
                </div>
              </div>

            </div>
          </div>
        </section>
    );
};

export default MeetTheTeam;