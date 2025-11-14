import React, { useState } from "react";
import { Mail } from "lucide-react";
import relayyLogo from "./relayy(logo).svg";

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="w-full text-emerald-100 "
      style={{
        background:
          "linear-gradient(180deg, #065F46 0%, #047857 50%, #064E3B 100%)",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div className="container mx-auto px-6 py-8 md:px-20 md:py-12">

        {/* -------------------- DESKTOP FOOTER (unchanged) -------------------- */}
        <div className="hidden md:grid grid-cols-2 gap-10 border-b border-emerald-700/40 pb-10">

          {/* COLUMN 1 */}
          <div className="flex flex-col gap-10">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <img src={relayyLogo} className="w-12 h-12" alt="logo" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  RELAYY
                </h2>
              </div>

              <p className="text-sm text-emerald-100/90 leading-relaxed">
                The campus marketplace for sustainable living. Buy, sell, and reduce waste within your institution’s community.
              </p>

              <a
                href="/signup"
                className="inline-flex px-6 py-2 mt-6 border border-emerald-300 text-sm rounded-md shadow-sm text-emerald-100 hover:bg-emerald-300 hover:text-emerald-900 transition"
              >
                GET STARTED
              </a>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                COMPANY
              </h3>
              <ul className="space-y-2 text-base text-emerald-200">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>

          </div>

          {/* COLUMN 2 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white tracking-wide mb-4">
              STAY UPDATED
            </h3>

            <p className="text-sm text-emerald-100/90 leading-snug mb-3">
              Get the latest news and updates delivered straight to your inbox.
            </p>

            <div className="space-y-3 max-w-sm">

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full py-2 pl-10 pr-4 rounded-md text-emerald-900 placeholder-emerald-600 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>

              <button className="w-full bg-emerald-400 text-emerald-900 font-semibold py-2 rounded-md hover:bg-emerald-300 transition shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* -------------------- MOBILE FOOTER (accordion) -------------------- */}
        <div className="md:hidden border-b border-emerald-700/40 pb-8 space-y-4">

          {/* BRAND SECTION */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3"
              onClick={() => toggle("brand")}
            >
              <span className="font-semibold text-white text-base">About Relayy</span>
              <span className="text-xl">{openSection === "brand" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === "brand" ? "max-h-80" : "max-h-0"
              }`}
            >
              <div className="pt-2">
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  The campus marketplace for sustainable living. Buy, sell, and reduce waste within your institution’s community.
                </p>

                <a
                  href="/signup"
                  className="inline-flex px-6 py-2 mt-4 border border-emerald-300 text-sm rounded-md shadow-sm text-emerald-100 hover:bg-emerald-300 hover:text-emerald-900 transition"
                >
                  GET STARTED
                </a>
              </div>
            </div>
          </div>

          {/* COMPANY SECTION */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3"
              onClick={() => toggle("company")}
            >
              <span className="font-semibold text-white text-base">Company</span>
              <span className="text-xl">{openSection === "company" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === "company" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="pt-2 space-y-2 text-base text-emerald-200">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* NEWSLETTER SECTION */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3"
              onClick={() => toggle("news")}
            >
              <span className="font-semibold text-white text-base">Stay Updated</span>
              <span className="text-xl">{openSection === "news" ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === "news" ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="pt-2 max-w-sm">

                <p className="text-sm text-emerald-100/90 leading-snug mb-3">
                  Get updates delivered straight to your inbox.
                </p>

                <div className="relative mb-3">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full py-2 pl-10 pr-4 rounded-md text-emerald-900 placeholder-emerald-600 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>

                <button className="w-full bg-emerald-400 text-emerald-900 font-semibold py-2 rounded-md hover:bg-emerald-300 transition shadow-md">
                  Subscribe
                </button>

              </div>
            </div>
          </div>

        </div>

        {/* ----------------- BOTTOM ----------------- */}
        <div className="text-center text-xs text-emerald-200 mt-6 pt-6">
          © 2025 Moon |
          <a href="/terms" className="underline ml-1 hover:text-white">Terms</a> |
          <a href="/privacy" className="underline ml-1 hover:text-white">Privacy</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
