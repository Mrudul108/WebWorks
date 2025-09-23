// frontend/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "Guest";

  const location = useLocation(); // Get current path

  // Open modal
  const handleLogoutClick = () => setShowLogoutModal(true);

  // Confirm logout
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  // Cancel logout
  const handleCancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg border-b border-blue-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition-colors duration-300">
                <Link to="/" className="flex items-center">
                  <span className="mr-2">💡</span>
                  ThinkHub FAMT
                </Link>
              </h1>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* User Greeting */}
              <div className="hidden sm:flex items-center bg-blue-500/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Hello, {username}</span>
              </div>

              {/* Home Link (hidden if already on home page) */}
              {location.pathname !== "/" && (
                <Link
                  to="/"
                  className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium px-2 py-1 rounded-md hover:bg-blue-500/10"
                >
                  Home
                </Link>
              )}

              {/* Conditional Links */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/ask"
                    className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Ask Question
                  </Link>

                  <button
                    onClick={handleLogoutClick} // open modal
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link
                    to="/login"
                    className="border border-blue-300 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 text-gray-700">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
