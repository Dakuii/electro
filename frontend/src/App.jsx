// src/App.jsx
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MobilePhonesPage from "./pages/MobilePhonesPage";
import LaptopsPage from "./pages/LaptopsPage";
import EarphonesPage from "./pages/EarphonesPage";
import SmartWatchesPage from "./pages/SmartWatchesPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";  // Import ResetPasswordPage

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mobile-phones" element={<MobilePhonesPage />} />
          <Route path="/laptops" element={<LaptopsPage />} />
          <Route path="/headphones-earbuds" element={<EarphonesPage />} />
          <Route path="/smartwatches" element={<SmartWatchesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
