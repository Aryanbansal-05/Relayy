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
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/users/login`,
        { username, email, college, hostel, password },
        { withCredentials: true }
      );

      const { user, token } = res.data;
      if (token) Cookies.set("auth_token", token, { expires: 1 / 24 });
      if (user) localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-josefin relative">
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <Header title="Signup" />
      <div className="flex justify-center items-center py-10 bg-white">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg grid md:grid-cols-2 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">Signup</h3>
            <form className="space-y-4" onSubmit={handleSignup}>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <input type="text" placeholder="College" value={college} onChange={(e) => setCollege(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <input type="text" placeholder="Hostel" value={hostel} onChange={(e) => setHostel(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
              <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">Create Account</button>
            </form>
          </div>
          <div className="hidden md:block bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
