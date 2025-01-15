import { FaShoppingCart, FaLaptop, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <header className="bg-red-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <FaLaptop className="text-3xl mr-2" />
          <h1 className="text-3xl font-bold">Electro+</h1>
        </div>
        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            Products
          </NavLink>
          {/* New ElectroBot Link */}
          <NavLink
            to="/electrobot"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            ElectroBot
          </NavLink>

          {/* New Electronica Link */}
          <NavLink
            to="/electronica"
            className={({ isActive }) =>
              `hover:text-gray-200 transition-colors font-semibold ${
                isActive ? "underline" : ""
              }`
            }
          >
            Electronica
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors flex items-center ${
                  isActive ? "underline" : ""
                }`
              }
            >
              <FaShoppingCart className="mr-1" />
              Cart
            </NavLink>
          )}
          {userRole === "admin" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors font-semibold ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-gray-200 transition-colors font-semibold ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-200 transition-colors font-semibold ${
                    isActive ? "underline" : ""
                  }`
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
                  `hover:text-gray-200 transition-colors font-semibold ${
                    isActive ? "underline" : ""
                  }`
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
