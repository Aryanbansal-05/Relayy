import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import NavbarLanding from "../NavbarLanding";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/users/login`,
        { username, password },
        { withCredentials: true }
      );

      const { user, token } = res.data;
      if (token) Cookies.set("auth_token", token, { expires: 1 / 24 });
      if (user) localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        err.message;
      alert(`Login failed: ${backendMessage}`);
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

      <main className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 flex-wrap">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1"
            style={{
              background: "linear-gradient(to bottom right, #D1FAE5, #FFFFFF, #A7F3D0)"
            }}
          >
            <div className="layout-content-container flex flex-col max-w-[480px] w-full">
              <div className="flex flex-col gap-3 pb-8 text-center lg:text-left">
                <p className="text-4xl font-black leading-tight tracking-tight text-gray-900">
                  Welcome Back!
                </p>
                <p className="text-emerald-700 text-base font-normal">
                  Your campus marketplace awaits.
                </p>
              </div>

              {/* Tabs */}
              <div className="pb-3">
                <div className="flex border-b border-emerald-300 gap-8">
                  <button className="flex-1 py-4 border-b-[3px] border-b-emerald-700 text-emerald-700 font-bold">
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex-1 py-4 border-b-[3px] border-b-transparent text-emerald-500 hover:text-emerald-700 transition"
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleLogin} className="flex flex-col gap-4 py-6">
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Email</p>
                  <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your username"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-14 p-4 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
                    placeholder="Enter your password"
                    required
                  />
                </label>

                <div className="flex justify-end pt-2">
                  <a href="/forgot" className="text-sm font-medium text-emerald-700 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="gradient-button flex items-center justify-center h-12 rounded-xl text-white text-base font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 hover:opacity-90 transition"
                >
                  Login
                </button>

                <p className="text-sm text-emerald-700 text-center pt-6">
                  By continuing, you agree to our{" "}
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
              src="/images/login-illustration.png"
              alt="Campus illustration"
              className="w-full h-full object-cover relative z-10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
