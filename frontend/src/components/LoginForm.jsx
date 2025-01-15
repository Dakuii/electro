// src/LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Using useNavigate for redirection
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const navigate = useNavigate(); // useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
  
      if (response.status === 200) {
        console.log("Login successful");
  
        // Store token and role in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", response.data.role); // Save the user's role
  
        // Redirect to the home page or dashboard after successful login
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Error logging in:", error);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Log in to Exclusive
      </h2>
      <p className="text-center text-gray-600 mb-6">Enter your details below</p>

      {/* Error message display */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-1/2 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
          >
            Log in
          </button>

          <Link
            to="/forgot-password"
            className="text-red-600 hover:underline ml-4"
          >
            Forgot Password?
          </Link>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Not a member?{" "}
        <Link to="/signup" className="text-red-600 hover:underline">
          Sign up now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
