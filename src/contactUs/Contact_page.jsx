import React from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import Hero from "./Hero";
import Getintouch from "./Getintouch";

function ContactPage() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Information Section */}
      <section className="w-10/12 mx-auto py-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">Information About us</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. 
            Malesuada sem tristique amet erat vitae eget dolor lobortis.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Way</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-semibold text-purple-700">Tel:</span> 877-67-88-99
            </li>
            <li>
              <span className="font-semibold text-purple-700">E-Mail:</span> shop@store.com
            </li>
            <li>
              20 Margaret St, London<br />
              Great Britain, 3NM98-LK
            </li>
          </ul>
        </div>
      </section>

      <Getintouch />
    </>
  );
}

export default ContactPage;
