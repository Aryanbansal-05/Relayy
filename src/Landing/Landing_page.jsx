import React from 'react';
import { Helmet } from 'react-helmet-async';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

import HeroSection from './Hero';
import JourneySection from './Journey';
import ThreadSection from './Thread';
import CampusSection from './Campus';

const RelayyLandingPage = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-hidden">
      <div className="fixed top-8 right-8 z-20 flex gap-4">
        <button onClick={() => navigate('/login')} className="font-display font-bold text-lg text-emerald-800 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-8 py-3 shadow-lg shadow-emerald-500/20 hover:bg-white transition-all duration-300 transform hover:scale-105">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="font-display font-bold text-lg text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full px-8 py-3 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-600/60 transition-all duration-300 transform hover:scale-105 hover:from-emerald-600 hover:to-emerald-500">
          Signup
        </button>
      </div>
        <HeroSection />
        <JourneySection />
        <ThreadSection />
        <CampusSection />
      </div>
    </>
  );
};

export default RelayyLandingPage;