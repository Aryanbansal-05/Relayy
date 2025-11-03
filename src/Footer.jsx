import React from "react";
import { ArrowRight } from "lucide-react";
import relayyLogo from "./relayy(logo).svg";

function Footer() {
  return (
    <footer
      className="gradient-bg text-emerald-100 shadow-inner font-josefin"
      style={{
        background:
          "linear-gradient(180deg, #065F46 0%, #047857 50%, #064E3B 100%)",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div className="container mx-auto px-8 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-emerald-700/50 pb-12">
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src={relayyLogo} alt="Relayy Logo" className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                RELAYY
              </h2>
            </div>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma
            </p>
            <button  className="mt-6 px-6 py-2 border border-emerald-400 text-sm flex items-center gap-2 text-emerald-100 hover:bg-emerald-400 hover:text-emerald-900 transition rounded-md shadow-sm">
              GET STARTED <ArrowRight size={16} />
            </button>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              ABOUT US
            </h3>
            <ul className="space-y-2 text-base text-emerald-200">
              <li><a href="/mission" className="hover:text-white transition">Mission</a></li>
              <li><a href="/team" className="hover:text-white transition">Our team</a></li>
              <li><a href="/awards" className="hover:text-white transition">Awards</a></li>
              <li><a href="/testimonials" className="hover:text-white transition">Testimonials</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy policy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              CATEGORIES
            </h3>
            <ul className="space-y-2 text-base text-emerald-200">
              <li><a href="/electronics" className="hover:text-white transition">Electronics</a></li>
              <li><a href="/books" className="hover:text-white transition">Books</a></li>
              <li><a href="/clothes" className="hover:text-white transition">Clothes</a></li>
              <li><a href="/shoes" className="hover:text-white transition">Shoes</a></li>
              <li><a href="/other" className="hover:text-white transition">Other</a></li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              PAGES
            </h3>
            <ul className="space-y-2 text-base text-emerald-200">
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/shop" className="hover:text-white transition">Browse shop</a></li>
              <li><a href="/apps" className="hover:text-white transition">Mobile apps</a></li>
              <li><a href="/elements" className="hover:text-white transition">Visual Composer Elements</a></li>
              <li><a href="/woocommerce" className="hover:text-white transition">WooCommerce Pages</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-emerald-700/50 pt-8 text-center text-sm text-emerald-200">
          <p>
            Copyright © 2025 Moon | All Rights Reserved |{" "}
            <a href="/terms" className="hover:text-white underline transition">Terms and Conditions</a> |{" "}
            <a href="/privacy" className="hover:text-white underline transition">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
