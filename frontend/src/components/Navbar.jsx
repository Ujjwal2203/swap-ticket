import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/context";

function StickyNavbar() {
  const { isLogin } = useContext(AuthContext);

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
            {!isLogin && (
              <Link
                to="/login-signup" // Links to login/signup
                className="border border-black text-black text-lg font-semibold rounded-full px-8 py-4 hover:bg-gray-100 hover:border-pink-600 hover:text-pink-600 transition-all"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StickyNavbar;
