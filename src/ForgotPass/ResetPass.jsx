// src/pages/auth/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarLanding from "../NavbarLanding";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = "https://relayy-backend-9war.onrender.com";

  const email = new URLSearchParams(useLocation().search).get("email");
  const otp = new URLSearchParams(useLocation().search).get("otp");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/v1/users/reset-password`, {
        email,
        otp,
        newPassword,
      });
      alert(res.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
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
            Reset Password
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Enter your new password below.
          </p>

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="password"
              className="rounded-xl h-14 p-4 bg-emerald-50 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="rounded-xl h-14 p-4 bg-emerald-50 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-xl text-white font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 hover:opacity-90 transition"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
