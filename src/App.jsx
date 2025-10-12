import { BrowserRouter, Route, Routes } from "react-router";
import Landing_page from "./Landing/Landing_page";
import Home_page from "./home/Home_page";
import Product_page from "./Product_details/Product_page";
import Contact_page from "./contactUs/Contact_page";
import About from "./AboutUs/About";
import Register from "./register/Register_page";
import Footer from "./Footer";
import { ReactLenis } from "lenis/react";
import ScrollOnTop from "./components/ScrollOnTop";
import Faqs from "./faqs/Faqs";
function App() {
  return (
     <ReactLenis
      root
      options={{
        lerp: 0.05,          
        duration: 1,      
        smoothWheel: true
      }}
    >
      <BrowserRouter>
      {/* <ScrollOnTop/> */}
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/home" element={<Home_page />} />
          <Route path="/product/:id" element={<Product_page />} />
          <Route path="/contact" element={<Contact_page />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ReactLenis>
  );
}

export default App;
