import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully.");
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error resetting password. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-12 shadow-2xl rounded-xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Reset Your Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
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
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordForm;
