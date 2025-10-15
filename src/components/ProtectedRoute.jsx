// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "https://relayy-backend-9war.onrender.com/api/v1/users/verify",
          { withCredentials: true }
        );

        if (res.status === 200 && res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
