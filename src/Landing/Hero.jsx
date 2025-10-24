import React from "react";
import { useNavigate } from "react-router";
import relayyLogo from '../relayy(logo).svg'; 
import NavbarLanding from "../NavbarLanding";

function Hero() {
    const navigate = useNavigate();

    return (
        <>
            <section className="relative bg-white overflow-hidden">
                <NavbarLanding />

                    {/* Hero Section */}
                    <div className="w-[90%] px-6 lg:px-20 py-5 grid grid-cols-1 lg:grid-cols-2  items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-7xl font-extrabold text-purple-800 leading-tight">
                                Your Campus, <br /> Your Market
                            </h1>
                            <p className="text-gray-600 text-xl max-w-md">
                                Relayy makes it easy for students to buy and sell used books, gadgets,
                                and essentials right inside your campus. Save money, reduce waste, and
                                find what you need from people you trust.
                            </p>
                            <button onClick={() => navigate("/signup")} className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition">
                                Start using Relayy
                            </button>
                        </div>

                        {/* Right Content (Mockup Images) */}
                        <div className="relative flex justify-center lg:justify-end w-[100%] left-20">

                            <img src="/Landing_imgs/Landing_img1.png" alt="App Mockup" />

                        </div>
                    </div>
               
            </section>
        </>
    );
}

export default Hero;
