// src/ForgotPasswordPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ForgotPasswordForm from "../components/ForgotPassword";

const ForgotPasswordPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header />

      <ForgotPasswordForm />

    <Footer />
  </div>
);

export default ForgotPasswordPage;
