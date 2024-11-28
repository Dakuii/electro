// src/LoginPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm"; // Import LoginForm

const LoginPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />

    <div className="flex-grow">
      <LoginForm />
    </div>

    <Footer />
  </div>
);

export default LoginPage;
