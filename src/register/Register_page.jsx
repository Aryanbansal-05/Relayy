import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

function Register() {
  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");

    // Set login/signup based on ?mode=
    const [isLogin, setIsLogin] = useState(mode !== "signup");

    // Optional: updates when URL changes (e.g. user toggles)
    useEffect(() => {
    setIsLogin(mode !== "signup");
    }, [mode]);


  // ✅ Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [otp, setOtp] = useState(""); // For OTP verification
  const [showOtp, setShowOtp] = useState(false); // Show OTP input after signup
  const navigate = useNavigate();

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        username,
        password,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token); // Save JWT token
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ---------------- SIGNUP HANDLER ----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      setIsLogin(true); // Switch to login form after signup
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };
  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/users/verify-otp", { email, otp });
      alert("Email verified successfully! You can now login.");
      setIsLogin(true);
      setShowOtp(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="font-josefin">
      {/* ✅ Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Header */}
      <Header title={isLogin ? "Login" : "Signup"} />

      {/* Main Form Area */}
      <div className="flex-grow flex justify-center items-center py-10 bg-white">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg grid md:grid-cols-2 overflow-hidden">
          {/* Form Section */}
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">{isLogin ? "Login" : "Signup"}</h3>
            <p className="text-sm text-gray-500 mb-6">
              {isLogin ? (
                <>
                  Do not have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-purple-700 font-medium hover:underline"
                  >
                    Create a new one.
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-purple-700 font-medium hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>

            {/* Form Content */}
            {/* Form Content */}
{isLogin ? (
  // ---------------- LOGIN FORM ----------------
  <form className="space-y-4" onSubmit={handleLogin}>
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
      <label className="text-sm text-gray-600">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
    >
      Login
    </button>

    <div className="text-center">
      <a href="/forgot" className="text-xs text-gray-500 hover:underline">
        Forgot Your Password?
      </a>
    </div>
  </form>
) : (
  // ---------------- SIGNUP FORM ----------------
  <>
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

    {/* ---------------- OTP FORM ---------------- */}
    {showOtp && (
      <form className="space-y-4 mt-4" onSubmit={handleVerifyOtp}>
        <div>
          <label className="text-sm text-gray-600">Enter OTP sent to your email</label>
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
  </>
)}

          </div>

          {/* Right Side (Gray Placeholder) */}
          <div className="hidden md:block bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
