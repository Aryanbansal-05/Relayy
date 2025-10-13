import React from "react";
import { ArrowRight } from "lucide-react";
import relayyLogo from './relayy(logo).svg'; 


function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-8 md:px-20 py-12 font-josefin">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-12">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full  flex items-center justify-center mr-1">
                            <img src={relayyLogo} alt="Relayy Logo" className="w-8 h-8" />
                        </div>
            <h2 className="text-xl font-bold text-white">RELAYY</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma
          </p>
          <button className="mt-6 px-6 py-2 border border-gray-400 text-sm flex items-center gap-2 hover:bg-gray-800 transition">
            GET STARTED <ArrowRight size={16} />
          </button>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-white font-bold mb-4">ABOUT US</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/mission" className="hover:text-white transition">Mission</a></li>
            <li><a href="/team" className="hover:text-white transition">Our team</a></li>
            <li><a href="/awards" className="hover:text-white transition">Awards</a></li>
            <li><a href="/testimonials" className="hover:text-white transition">Testimonials</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-bold mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/electronics" className="hover:text-white transition">Electronics</a></li>
            <li><a href="/books" className="hover:text-white transition">Books</a></li>
            <li><a href="/clothes" className="hover:text-white transition">Clothes</a></li>
            <li><a href="/shoes" className="hover:text-white transition">Shoes</a></li>
            <li><a href="/other" className="hover:text-white transition">Other</a></li>
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white font-bold mb-4">PAGES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/shop" className="hover:text-white transition">Browse shop</a></li>
            <li><a href="/apps" className="hover:text-white transition">Mobile apps</a></li>
            <li><a href="/elements" className="hover:text-white transition">Visual Composer Elements</a></li>
            <li><a href="/woocommerce" className="hover:text-white transition">WooCommerce Pages</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-xs text-gray-400">
        <p>
          Copyright © 2025 Moon | All Rights Reserved |{" "}
          <a href="/terms" className="hover:underline">Terms and Conditions</a> |{" "}
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
