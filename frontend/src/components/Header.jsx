// src/Header.jsx
import { FaShoppingCart, FaLaptop, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken'); // Check for an auth token in localStorage

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the auth token on logout
    localStorage.removeItem('username'); // Remove the username on logout
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="bg-red-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <FaLaptop className="text-3xl mr-2" /> {/* Laptop icon */}
          <h1 className="text-3xl font-bold">Electro+</h1>
        </div>
        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors flex items-center ${isActive ? "underline" : ""}`
            }
          >
            <FaShoppingCart className="mr-1" />
            Cart
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:text-gray-200 transition-colors font-semibold ${isActive ? "underline" : ""}`
                }
              >
                <FaUser className="mr-1" />
              </NavLink>


              <button
                onClick={handleLogout}
                className="hover:text-gray-200 transition-colors flex items-center"
              >
                <FaSignOutAlt className="mr-1" />           
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
