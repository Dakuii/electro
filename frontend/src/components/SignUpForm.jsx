// src/SignUpPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUpForm"; // Import SignUpForm

const SignUpPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header />
    <SignUpForm />
    <Footer />
  </div>
);

export default SignUpPage;
