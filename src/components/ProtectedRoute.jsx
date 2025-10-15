import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/verify",
          { withCredentials: true }
        );
        if (res.status === 200) setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
