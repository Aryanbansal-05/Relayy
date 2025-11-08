import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarLanding from "../NavbarLanding";
import loginimg from "./loginimage.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [autoDetected, setAutoDetected] = useState(false); // NEW: track auto-fill
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const backendURL = "https://relayy-backend-9war.onrender.com";

  // College dropdown options (fallback)
  const collegeOptions = [
    "Thapar University",
    "Manipal University Jaipur",
    "NIT Jalandhar",
    "IIT Ropar",
  ];

  // Email domain → college mapping
  const domainToCollege = {
    "thapar.edu": "Thapar University",
    "muj.manipal.edu": "Manipal University Jaipur",
    "nitj.ac.in": "NIT Jalandhar",
    "iitrpr.ac.in": "IIT Ropar",
  };

  // Handle email input (auto-detect college)
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const domain = inputEmail.split("@")[1];
    if (domain && domainToCollege[domain]) {
      setCollege(domainToCollege[domain]);
      setAutoDetected(true); // mark as auto-detected
    } else {
      setCollege("");
      setAutoDetected(false);
    }
  };

  // Handle Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/users/signup`,
        { username, email, college, hostel, password },
        { withCredentials: true }
      );

      alert(res.data.message || "OTP sent to your email. Please verify.");
      navigate(`/verify-otp?email=${email}`);
    } catch (err) {
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed. Please try again.";
      alert(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="font-josefin min-h-screen flex flex-col bg-white">
      <NavbarLanding />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          <div className="loader border-4 border-emerald-700 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}

      <main className="layout-container flex flex-col flex-1">
        <div className="flex flex-1 flex-wrap">
          {/* LEFT SECTION */}
          <div
            className="w-full lg:w-1/2 flex items-start justify-center p-8 lg:p-12 order-2 lg:order-1"
            style={{
              background:
                "linear-gradient(to bottom right, #D1FAE5, #FFFFFF, #A7F3D0)",
            }}
          >
            <div className="max-w-[480px] w-full">
              <div className="text-center lg:text-left pb-8">
                <h1 className="text-4xl font-black text-gray-900 leading-tight">
                  Create Your Account
                </h1>
                <p className="text-emerald-700 text-base">
                  Join your campus marketplace today.
                </p>
              </div>

              {/* Tabs */}
              <div className="pb-3 border-b border-emerald-300 flex gap-8">
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 py-4 border-b-[3px] border-b-transparent text-emerald-500 hover:text-emerald-700 transition"
                >
                  Login
                </button>
                <button className="flex-1 py-4 border-b-[3px] border-b-emerald-700 text-emerald-700 font-bold">
                  Sign Up
                </button>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSignup}
                className="flex flex-col gap-4 py-6"
              >
                {/* Username */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none"
                    placeholder="Enter your username"
                    required
                  />
                </label>

                {/* Email */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">College Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none"
                    placeholder="Enter your college email"
                    required
                  />
                </label>

                {/* College */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">College</p>
                  {autoDetected ? (
                    <input
                      type="text"
                      value={college}
                      readOnly
                      className="rounded-xl h-14 p-4 bg-emerald-50 text-gray-700 border border-emerald-200 cursor-not-allowed"
                    />
                  ) : (
                    <select
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none text-gray-700"
                      required
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
                  )}
                </label>

                {/* Hostel */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Hostel</p>
                  <input
                    type="text"
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none"
                    placeholder="Enter your hostel name"
                    required
                  />
                </label>

                {/* Password */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </label>

                {/* Confirm Password */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">
                    Confirm Password
                  </p>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 rounded-xl text-white font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 hover:opacity-90 transition"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-sm text-emerald-700 text-center pt-6">
                  By signing up, you agree to our{" "}
                  <a
                    href="/terms"
                    className="font-medium text-emerald-700 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-emerald-700 hover:underline"
                  >
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
              src={loginimg}
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
