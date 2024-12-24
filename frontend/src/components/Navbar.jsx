import React from "react";
import { Link } from "react-router-dom";

export function StickyNavbar() {
  return (
    <div className="w-full">
      <nav className="sticky top-0 z-10 h-max w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-16 py-8">
          {/* Logo Section */}
          <Link
            to="/"
            className="text-pink-600 font-bold text-3xl tracking-widest hover:scale-105 transition-transform pl-8"
          >
            Swap Tickets
          </Link>

          {/* Right Section: Buttons */}
          <div className="flex items-center gap-12">
            {/* Re-sell Tickets */}
            <Link
              to="/resell-tickets"
              className="text-black font-semibold text-lg cursor-pointer hover:underline hover:text-pink-600 transition-colors"
            >
              Re-sell tickets
            </Link>
            {/* Create an Event Button */}
            <Link
              to="/create-event"
              className="bg-pink-600 text-white text-lg font-semibold rounded-full px-8 py-4 shadow-md hover:shadow-lg hover:bg-pink-700 transition-all"
            >
              Create an event
            </Link>
            {/* Login/Signup Button */}
            <Link
              to="/login-signup"
              className="border border-black text-black text-lg font-semibold rounded-full px-8 py-4 hover:bg-gray-100 hover:border-pink-600 hover:text-pink-600 transition-all"
            >
              Login/Signup
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
