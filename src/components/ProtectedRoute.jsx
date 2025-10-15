// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // ✅ Dynamically pick backend based on environment
  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/users/verify`, {
          withCredentials: true, // ✅ sends cookies for auth
        });

        if (res.status === 200 && res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error(
          "Verification failed:",
          err.response?.data?.message || err.message
        );
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [backendURL]);

  // ✅ Show loader during verification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Checking session...
      </div>
    );
  }

  // ✅ Redirect unauthenticated users to login
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
