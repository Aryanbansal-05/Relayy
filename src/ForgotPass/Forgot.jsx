// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarLanding from "../NavbarLanding";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const backendURL = "https://relayy-backend-9war.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${backendURL}/api/v1/users/forgot-password`, { email });
      alert(res.data.message || "OTP sent to your email for password reset");
      navigate(`/verify-reset-otp?email=${email}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-josefin min-h-screen flex flex-col bg-white">
      <NavbarLanding />
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          <div className="loader border-4 border-emerald-700 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}

      <main className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md bg-emerald-100 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Forgot Password
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Enter your registered college email to receive an OTP for password reset.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              className="rounded-xl h-14 p-4 bg-emerald-50 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="Enter your college email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-xl text-white font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 hover:opacity-90 transition"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
