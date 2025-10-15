import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"; // ✅ For cookies

function Signup() {
  // ✅ Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        "https://relayy-backend-9war.onrender.com/api/v1/users/signup",
        { username, email, college, hostel, password }
      );

      const user =
        res.data?.user ||
        res.data?.data ||
        (res.data?.email ? { email: res.data.email, username, college, hostel } : null);
      const token =
        res.data?.token || (res.data?.data && res.data.data.token) || null;

      // ✅ Set session token as cookie (1-hour expiry)
      if (token) {
        Cookies.set("auth_token", token, { expires: 1 / 24 });
      }

      // ✅ Store user info in localStorage for quick retrieval
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.email) localStorage.setItem("userEmail", user.email);
      } else {
        localStorage.setItem("userEmail", email);
        localStorage.setItem(
          "user",
          JSON.stringify({ email, username, college, hostel })
        );
      }

      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 800);
    } catch (err) {
      setIsLoading(false);
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ OTP verification handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://relayy-backend-9war.onrender.com/api/v1/users/verify-otp", {
        email,
        otp,
      });
      alert("Email verified successfully! You can now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="font-josefin relative">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="loader"></div>
        </div>
      )}

      {/* Navbar & Header */}
      <Header title="Signup" />

      {/* Main Form Section */}
      <div className="flex-grow flex justify-center items-center py-10 bg-white">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg grid md:grid-cols-2 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">Signup</h3>
            <p className="text-sm text-gray-500 mb-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-700 font-medium hover:underline"
              >
                Login
              </a>
            </p>

            {/* Signup Form */}
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">College Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              {/* ✅ College Name Input */}
              <div>
                <label className="text-sm text-gray-600">College Name</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              {/* ✅ Hostel Name Input */}
              <div>
                <label className="text-sm text-gray-600">Hostel Name</label>
                <input
                  type="text"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              {/* Password fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4" required />
                <span>
                  I have read and agreed to the Terms of Service and Privacy Policy
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Create Account
              </button>
            </form>

            {/* OTP Verification Form */}
            {showOtp && (
              <form className="space-y-4 mt-4" onSubmit={handleVerifyOtp}>
                <div>
                  <label className="text-sm text-gray-600">
                    Enter OTP sent to your email
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Verify OTP
                </button>
              </form>
            )}
          </div>

          {/* Placeholder Section */}
          <div className="hidden md:block bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
