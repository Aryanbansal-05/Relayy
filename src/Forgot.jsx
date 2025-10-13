import React from "react";

function Forgot() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center p-6 mb-20">
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-2xl">
        <h1 className="text-6xl font-extrabold text-purple-800 mb-6 ">
          WHY FORGOT???😡
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          We can’t really help you with that... <br /> 
          maybe just make a new ID 
        </p>
        <button
          onClick={() => (window.location.href = "/register")}
          className="mt-4 px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xl rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          Create a New Account 
        </button>
      </div>
    </div>
  );
}

export default Forgot;
