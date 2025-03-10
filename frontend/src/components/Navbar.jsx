import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/context";

function StickyNavbar() {
  const { isLogin, userName, setIsLogin } = useContext(AuthContext); // Get username from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsLogin(false); // Update login status
    localStorage.removeItem("authToken"); // Optionally clear local storage
    // Add any logout functionality, like redirecting to home page
  };

  return (
    <div className="w-full">
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-16 py-8">
          {/* Logo Section */}
          <Link
            to="/" // Goes to home
            className="text-pink-600 font-bold text-3xl tracking-widest hover:scale-105 transition-transform pl-8"
          >
            Swap Tickets
          </Link>

          {/* Right Section: Buttons */}
          <div className="flex items-center gap-12">
            {/* Re-sell Tickets */}
            <Link
              to="/resell-tickets" // This should route correctly now
              className="text-black font-semibold text-lg cursor-pointer hover:underline hover:text-pink-600 transition-colors"
            >
              Re-sell tickets
            </Link>

            {/* Create an Event Button */}
            <Link
              to="/create-event" // This should route correctly now
              className="bg-pink-600 text-white text-lg font-semibold rounded-full px-8 py-4 shadow-md hover:shadow-lg hover:bg-pink-700 transition-all"
            >
              Create an event
            </Link>

            {/* Login/Signup Button (only visible if not logged in) */}
            {!isLogin ? (
              <Link
                to="/login-signup" // Links to login/signup
                className="border border-black text-black text-lg font-semibold rounded-full px-8 py-4 hover:bg-gray-100 hover:border-pink-600 hover:text-pink-600 transition-all"
              >
                Login/Signup
              </Link>
            ) : (
              // User Dropdown (visible when logged in)
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-black text-lg font-semibold flex items-center space-x-2 cursor-pointer"
                >
                  <span className="font-bold">{userName}</span> {/* Display username here */}
                  <svg
                    className="w-4 h-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
                    <ul>
                      <li className="px-6 py-3 text-lg font-bold text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to="/manage-events">Manage Events</Link>
                      </li>
                      <li className="px-6 py-3 text-lg font-bold text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to="/my-listings">My Listings</Link>
                      </li>
                      <li className="px-6 py-3 text-lg font-bold text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to="/my-bookings">My Bookings</Link>
                      </li>
                      <li
                        className="px-6 py-3 text-lg font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StickyNavbar;
