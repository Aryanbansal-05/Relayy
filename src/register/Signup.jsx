import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  const collegeOptions = [
    "Thapar University",
    "Manipal University Jaipur",
    "NIT Jalandhar",
    "IIT Ropar",
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/users/signup`,
        { username, email, college, hostel, password },
        { withCredentials: true }
      );

      const { user, token } = res.data;
      if (token) Cookies.set("auth_token", token, { expires: 1 / 24 });
      if (user) localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      console.error("Signup error:", err);
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        err.message;
      alert(`Signup failed: ${backendMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-josefin min-h-screen flex flex-col bg-white">
      {/* <Header title="Signup" /> */}

      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          <div className="loader border-4 border-emerald-600 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}

      <main className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 flex-wrap">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1 bg-gradient-to-br from-green-50/50 via-white to-green-50/50">
            <div className="layout-content-container flex flex-col max-w-[480px] w-full">
              <div className="flex flex-col gap-3 pb-8 text-center lg:text-left">
                <p className="text-4xl font-black leading-tight tracking-tight text-gray-900">
                  Create Your Account
                </p>
                <p className="text-emerald-700 text-base font-normal">
                  Join your campus marketplace today.
                </p>
              </div>

              {/* Tabs */}
              <div className="pb-3">
                <div className="flex border-b border-emerald-200 gap-8">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex-1 py-4 border-b-[3px] border-b-transparent text-emerald-500 hover:text-emerald-700 transition"
                  >
                    Login
                  </button>
                  <button
                    className="flex-1 py-4 border-b-[3px] border-b-emerald-600 text-emerald-700 font-bold"
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSignup} className="flex flex-col gap-4 py-6">
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your username"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your email"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">College</p>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="" disabled>
                      Select your College
                    </option>
                    {collegeOptions.map((col, index) => (
                      <option key={index} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Hostel</p>
                  <input
                    type="text"
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your hostel"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your password"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Confirm Password</p>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Confirm your password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="gradient-button flex items-center justify-center h-12 rounded-xl text-white text-base font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-90 transition"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-sm text-emerald-700 text-center pt-6">
                  By signing up, you agree to our{" "}
                  <a href="/terms" className="font-medium text-emerald-700 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-medium text-emerald-700 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 opacity-30"></div>
            <img
              src="/images/signup-illustration.png"
              alt="Campus community illustration"
              className="w-full h-full object-cover relative z-10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
