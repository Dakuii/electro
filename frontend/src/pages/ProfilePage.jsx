import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
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
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setIsEditing(false);
      setErrorMessage("");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Error updating profile.");
      } else {
        setErrorMessage("Error updating profile.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Profile</h1>
        <div className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">User Information</h2>

          {errorMessage && (
            <div className="text-red-600 mb-6">
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="address" className="block text-gray-700 font-medium">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className={`py-3 px-6 text-lg font-semibold text-white rounded-md transition-all duration-300 ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={!isEditing}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="py-3 px-6 text-lg font-semibold text-white rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
