import React from 'react';
import './Landingpage.css';
// Import useNavigate to handle clicks
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  // Initialize navigate
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-emerald-100 p-4 text-center clip-path-swoop">

      <div className="fixed top-8 left-8 z-20 flex gap-6"> 
        <button
          onClick={() => navigate('/contact')}
          className="font-body font-medium text-lg text-emerald-800/80 py-3 transition-all duration-300 transform hover:scale-110 hover:text-emerald-900"
        >
          Contact
        </button>
        <button
          onClick={() => navigate('/about')}
          className="font-body font-medium text-lg text-emerald-800/80 py-3 transition-all duration-300 transform hover:scale-110 hover:text-emerald-900"
        >
          About Us
        </button>
      </div>
      {/* --- END ADDED TEXT LINKS --- */}


      {/* --- Your Existing Login/Signup Buttons (RIGHT) --- */}
      <div className="fixed top-8 right-8 z-20 flex gap-4">
        <button onClick={() => navigate('/login')} className="font-display font-bold text-lg text-emerald-800 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-8 py-3 shadow-lg shadow-emerald-500/20 hover:bg-white transition-all duration-300 transform hover:scale-105">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="font-display font-bold text-lg text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full px-8 py-3 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-600/60 transition-all duration-300 transform hover:scale-105 hover:from-emerald-600 hover:to-emerald-500">
          Signup
        </button>
      </div>
      {/* --- END LOGIN/SIGNUP BUTTONS --- */}

      
      {/* --- Rest of your Hero Section Code --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-emerald-100 to-white/50 opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-carbon.png')] opacity-[0.05]"></div>
      <div
        className="absolute -top-1/3 -left-1/4 w-3/5 h-3/5 bg-gradient-to-br from-emerald-400/50 to-emerald-300/50 organic-shape animate-float"
        style={{ animationDelay: '-2s' }}
      ></div>
      <div
        className="absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-emerald-500/50 to-emerald-400/50 organic-shape animate-float"
        style={{ animationDelay: '-5s' }}
      ></div>

      <div className="relative z-10 animate-fade-in-up">
        <h1 className="font-display text-8xl font-extrabold uppercase tracking-widest text-gray-900 md:text-9xl [text-shadow:_0_8px_20px_rgb(16_185_129_/_0.2)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
            R
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
            E
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800">
            L
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900">
            A
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800">
            Y
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800">
            Y
          </span>
        </h1>
        <p className="font-body mt-4 text-xl font-medium text-emerald-800/90 md:text-3xl [text-shadow:_0_2px_4px_rgb(255_25f_255_/_80%)]">
          The story of stuff. Relayed.
        </p>
        <div className="mt-24 flex flex-col items-center gap-3">
          <p className="font-body text-base text-emerald-700/80">
            Scroll to begin the journey
          </p>
          <span className="material-symbols-outlined animate-bounce text-emerald-700/80 text-3xl">
            south
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;