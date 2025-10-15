import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Landing_page from "./Landing/Landing_page";
import Home_page from "./home/Home_page";
import Product_page from "./Product_details/Product_page";
import Contact_page from "./contactUs/Contact_page";
import About from "./AboutUs/About";
import Footer from "./Footer";
import { ReactLenis } from "lenis/react";
import Faqs from "./faqs/Faqs";
import Forgot from "./Forgot";
import Login from "./register/Login";
import Signup from "./register/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://relayy-backend-9war.onrender.com";

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1,
        smoothWheel: true,
      }}
    >
      <BrowserRouter>
        <AutoRedirect />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing_page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Product_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <Faqs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ReactLenis>
  );
}

// ✅ Auto redirect component — runs once on load
function AutoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/api/v1/users/verify");
        if (res.status === 200 && res.data.user) {
          // already authenticated
          navigate("/home", { replace: true });
        }
      } catch (err) {
        // no valid session, stay on current route
      }
    };
    checkSession();
  }, [navigate]);

  return null;
}

export default App;
