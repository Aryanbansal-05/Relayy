import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Switch backend automatically
  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://relayy-backend-9war.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/users/verify`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [backendURL, navigate]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
    );

  return (
    <div className="font-josefin min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">
            My Profile
          </h2>

          {user ? (
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">College:</span> {user.college}
              </p>
              <p>
                <span className="font-semibold">Hostel:</span> {user.hostel}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No user data available.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800">Your Activity</h3>
          <button
            onClick={() => navigate("/sell")}
            className="bg-purple-700 text-white px-5 py-2 rounded-md hover:bg-purple-800 transition"
          >
            + Sell an Item
          </button>
        </div>

        {/* My Purchases */}
        <section className="mb-8">
          <h4 className="text-lg font-semibold text-purple-700 mb-3">
            🛒 My Purchases
          </h4>
          <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
            <p>No purchases yet.</p>
          </div>
        </section>

        {/* My Ads */}
        <section>
          <h4 className="text-lg font-semibold text-purple-700 mb-3">
            📢 My Ads
          </h4>
          <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
            <p>You haven’t listed any items for sale yet.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
