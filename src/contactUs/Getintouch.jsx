import React from "react";

function Getintouch() {
  return (
    <section className="w-10/12 mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
      <p className="text-gray-600 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices tristique amet erat vitae.
      </p>
      
      <form className="grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name*"
          className="border border-gray-300 p-3 rounded w-full"
        />
        <input
          type="email"
          placeholder="Your E-mail*"
          className="border border-gray-300 p-3 rounded w-full"
        />
        <input
          type="text"
          placeholder="Subject*"
          className="border border-gray-300 p-3 rounded col-span-2"
        />
        <textarea
          placeholder="Type Your Message*"
          className="border border-gray-300 p-3 rounded col-span-2 h-40"
        />
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded w-fit">
          Send Mail
        </button>
      </form>
    </section>
  );
}

export default Getintouch;
