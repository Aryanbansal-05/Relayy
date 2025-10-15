import React from "react";
import Header from "../components/Header";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function Contact() {
  return (
    <>
      {/* ✅ Page Header */}
      <Header title="Contact Us" />

      <section className="w-11/12 md:w-10/12 mx-auto py-16 grid md:grid-cols-2 gap-12 text-gray-700 font-josefin">
        
        {/* Left Column – About Info & Contact Details */}
        <div>
          <h2 className="text-3xl font-semibold text-purple-800 mb-5">Get in Touch</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            We’d love to hear from you! Whether you have a question about products, pricing, or anything else, 
            our team is ready to answer all your questions. Reach out to us using any of the methods below or fill out the form.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Phone className="text-purple-700 w-5 h-5" />
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> +91 877-67-88-99
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-purple-700 w-5 h-5" />
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> shop@relayy.com
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-purple-700 w-5 h-5 mt-1" />
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> 20 Margaret St, London<br />
                Great Britain, 3NM98-LK
              </p>
            </div>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="bg-gray-50 shadow-md rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
