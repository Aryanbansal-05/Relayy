import React, { useState, useEffect } from 'react';

// ... (your SVG icons remain the same) ...
const CloseIcon = () => (
  <svg className="w-6 h-6 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);
const ModalIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v.01m0-4.01V7m0 4.01v.01m0 3.99V16m0-4v.01m0 .01H12m0 0h.01m-4.01 4.01v.01m0-4.01v.01m4.01 0v.01m0 0h.01m-4.01-4.01v.01M12 7v.01M12 16v.01m0-4v.01m0 0h.01M7.99 16.01v.01m0-4v.01m4.01 0v.01m0 0h.01m-4.01 4.01v.01M12 16.01v.01m0-4.01v.01m3.99-.01v.01m0 4.01v.01m-4.01 0v.01M12 12.01v.01"></path>
  </svg>
);
// ...

export default function OfferModal({ productName, currentPrice, onSubmit, onClose }) {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsMounted(false);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e) => {
    // If the click is on the backdrop itself (not the card), close.
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (offerAmount && parseFloat(offerAmount) > 0) {
      onSubmit({ offerAmount: parseFloat(offerAmount), message });
      setOfferAmount('');
      setMessage('');
    } else {
      alert('Please enter a valid offer amount.');
    }
  };

  return (
    // --- THIS IS THE UPDATED LINE ---
    <div 
      onClick={handleBackdropClick} // Add this onClick handler
      className={`fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center p-4 z-50 transition-opacity duration-300 ease-out
      ${isMounted ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* The rest of the file is unchanged.
        The `handleBackdropClick` function works because the modal card
        is a *child* of this div. Clicks on the card won't bubble up
        as e.target === e.currentTarget.
      */}
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 ease-out
        ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}>
        
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <CloseIcon />
        </button>

        <div className="mx-auto flex items-center justify-center h-16 w-16 bg-emerald-100 rounded-full">
          <ModalIcon />
        </div>

        <div className="mt-3 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Make an Offer</h2>
          <p className="text-gray-600 mb-6">
            You're offering on <span className="font-semibold">"{productName}"</span>.
            Current price: <span className="font-bold">₹{currentPrice}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ... (form inputs remain the same) ... */}
           <div className="mb-4">
            <label htmlFor="offerAmount" className="block text-gray-700 text-sm font-bold mb-2">
              Your Offer Amount (₹)
            </label>
            <input
              type="number"
              id="offerAmount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder="e.g., 800"
              min="1"
              step="any"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message to Seller (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              placeholder="e.g., 'I can pick this up tomorrow if you accept!'"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
            >
              Submit Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}