import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/context";
import { toast, Toaster } from "react-hot-toast";

function StickyNavbar() {
  const { isLogin, userName, setIsLogin } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken");
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <Toaster position="top-center" />
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-16 py-8">
          {/* Logo Section */}
          <Link
            to="/"
            className="text-pink-600 font-bold text-3xl tracking-widest hover:scale-105 transition-transform pl-8"
          >
            Swap Tickets
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-12">
            <Link
              to="/resell-tickets"
              className="text-black font-semibold text-lg cursor-pointer hover:underline hover:text-pink-600 transition-colors"
            >
              Re-sell tickets
            </Link>

            <Link
              to="/create-event"
              className="bg-pink-600 text-white text-lg font-semibold rounded-full px-8 py-4 shadow-md hover:shadow-lg hover:bg-pink-700 transition-all"
            >
              Create an event
            </Link>

            {!isLogin ? (
              <Link
                to="/login-signup"
                className="border border-black text-black text-lg font-semibold rounded-full px-8 py-4 hover:bg-gray-100 hover:border-pink-600 hover:text-pink-600 transition-all"
              >
                Login/Signup
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-black text-lg font-semibold flex items-center space-x-2 cursor-pointer"
                >
                  <span className="font-bold">{userName}</span>
                  <svg
                    className="w-4 h-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-xl z-10 animate-fadeIn">
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
