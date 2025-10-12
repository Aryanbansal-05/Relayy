import React from "react";
import { useNavigate } from "react-router";

function Hero() {
    const navigate = useNavigate();

    return (
        <>
            <section className="relative bg-white overflow-hidden">
                {/* Navbar */}
                <header className="w-[95 %] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between mt-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                        <span className="font-bold text-purple-800 text-xl">RELAYY</span>
                    </div>

                    <nav className="hidden md:flex space-x-8 font-medium text-gray-800">
                        <a href="#" className="hover:text-purple-800">Products</a>
                        <a href="#" className="hover:text-purple-800">Features</a>
                        <a href="#" className="hover:text-purple-800">Pricing</a>
                        <a href="#" className="hover:text-purple-800">Support</a>
                    </nav>

                    <div className="flex space-x-3">
                        <a
                            onClick={() => navigate("/register?mode=login")}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Login
                        </a>
                        <a className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition" href="/register">
                            SignUp
                        </a>
                    </div>
                </header>

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
                            <button onClick={() => navigate("/register?mode=signup")} className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition">
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
