import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://relayy-backend-9war.onrender.com/api/v1/users/login",
        { username, password },
        { withCredentials: true } // ✅ allows cookies
      );

      const { user, token } = res.data;
      if (token) Cookies.set("auth_token", token, { expires: 1 / 24 }); // 1 hour
      if (user) localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
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

      <Header title="Login" />

      <div className="flex justify-center items-center py-10 bg-white">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg grid md:grid-cols-2 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">Login</h3>
            <p className="text-sm text-gray-500 mb-6">
              Don’t have an account?{" "}
              <a href="/signup" className="text-purple-700 font-medium hover:underline">
                Create one
              </a>
            </p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              >
                Login
              </button>
            </form>
          </div>
          <div className="hidden md:block bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
