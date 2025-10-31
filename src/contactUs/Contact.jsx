import React from 'react';
import { Send } from 'lucide-react';

/**
 * A self-contained contact form component.
 * THEME FIXED: Updated to use the Emerald theme.
 */
const Contact = () => {
  return (
    // Use emerald-100 for a light card background, as per your theme file
    <div className="bg-emerald-100 p-8 rounded-xl w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-800">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            // Use emerald-400 for the focus ring, per your theme file
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-800">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-800">
            Message
          </label>
          <textarea
            rows="5"
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          // Use emerald-600 and emerald-700 for the button, per your theme file
          className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-md"
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </form>

      {/* Simple alternative contact */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-700">
          Or email us directly at
          <a
            href="mailto:support@relayy.com"
            // Use emerald-700 for links, per your theme file
            className="font-semibold text-emerald-700 hover:underline ml-1"
          >
            support@relayy.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;

