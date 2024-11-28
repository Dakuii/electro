import { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "", // Added to hold the message
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          message: "", // Reset message when fetching user data
        });
      } catch (error) {
        console.error("Error fetching user data", error);
        setErrorMessage("Failed to load user data.");
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-message", {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        message: userData.message,
      });
      setSuccessMessage(response.data.message || "Message sent successfully!");
      setUserData({ name: "", email: "", phone: "", message: "" }); // Reset form
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error("Error sending message", error);
      setErrorMessage("Failed to send the message.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg flex flex-col justify-between">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Send Us a Message
      </h3>
      {errorMessage && (
        <div className="text-red-600 mb-4">
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="text-green-600 mb-4">
          <p>{successMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={userData.message}
            onChange={handleChange}
            className="w-full p-4 h-48 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
