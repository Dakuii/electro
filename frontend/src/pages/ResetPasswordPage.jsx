// src/ResetPasswordPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header />

      <ResetPasswordForm />

    <Footer />
  </div>
);

export default ResetPasswordPage;
