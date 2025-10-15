import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"; // ✅ For cookies

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axios.post(
        "https://relayy-backend-9war.onrender.com/api/v1/users/login",
        { username, password }
      );

      const user = res.data?.user || res.data?.data || res.data || null;
      const token =
        res.data?.token || (res.data?.data && res.data.data.token) || null;

      if (token) {
        // ✅ Set auth token in cookie (expires in 1 hour)
        Cookies.set("auth_token", token, { expires: 1 / 24 }); // 1 hour expiry
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.email) localStorage.setItem("userEmail", user.email);
      }

      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 800);
    } catch (err) {
      setIsLoading(false);
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="font-josefin relative">
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="loader"></div>
        </div>
      )}

     
      <Header title="Login" />

      <div className="flex-grow flex justify-center items-center py-10 bg-white">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg grid md:grid-cols-2 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">Login</h3>
            <p className="text-sm text-gray-500 mb-6">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-purple-700 font-medium hover:underline"
              >
                Create a new one.
              </a>
            </p>

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
          </div>

          <div className="hidden md:block bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
