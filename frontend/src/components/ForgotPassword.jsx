// src/components/ForgotPasswordForm.jsx
import { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error sending reset link. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-12 shadow-2xl rounded-xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Forgot Your Password?
        </h3>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Enter your email address below, and we'll send you instructions to
          reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white text-lg font-bold py-4 rounded-lg hover:bg-red-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-lg text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
