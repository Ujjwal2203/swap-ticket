import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full text-white bg-[#0F172A] overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50]">
        {/* Gradient Decorative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-16 w-44 h-44 bg-pink-400 opacity-15 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-16 right-24 w-56 h-56 bg-yellow-300 opacity-15 rounded-full blur-[120px]"></div>
        </div>

        {/* Content */}
        <div className="z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
            Discover <span className="text-yellow-300">Incredible Events</span>{" "}
            Near You
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find, reserve, and enjoy exclusive experiences with ease. Your next
            adventure starts here!
          </p>
          <div className="mt-6 flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Search events near you"
              className="py-2 px-4 w-64 md:w-80 rounded-l-md text-gray-800 focus:outline-none shadow-md"
            />
            <button className="bg-yellow-400 text-gray-900 font-medium py-2 px-6 rounded-r-md hover:bg-yellow-500 transition duration-300 shadow-md">
              Search
            </button>
          </div>
        </div>

        {/* Call-to-Action Button */}

        <div className="mt-8 z-10">
          <Link
            to="/login-signup"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get Started Now
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 animate-bounce z-10">
          <span className="text-gray-400 text-sm">Scroll Down ↓</span>
        </div>
      </div>

      {/* Feature Section */}
      <div className="w-full h-screen py-8 px-8 bg-gradient-to-r from-[#1F2937] via-[#2C3E50] to-[#1F2937] text-white flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-7xl">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="text-gray-300">✨ NEW</span>
              <span>Event Ticketing Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seamless Event Management, Tailored for You
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Experience an intuitive platform with minimal fees and powerful
              tools for managing events effortlessly.
            </p>
            <Link to="/create-event">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 shadow-md">
              Create Your Event
            </button>
            </Link>
          </div>

          {/* Right Image/Graphic */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 mx-auto flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event Badge"
                  className="object-contain"
                />
              </div>
              <p className="text-center text-green-500 mt-4 font-medium">
                Event organizers, look no further!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full py-16 px-8 bg-[#2C3E50] text-white text-center">
        <h3 className="text-4xl font-bold mb-6 text-yellow-300">
          Echoes of Excitement:{" "}
          <span className="text-white">Our Fans Spread the Word</span>
        </h3>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          See what our excited users are saying about their experience with us.
          Their stories inspire us to keep improving and delivering the best
          events!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-72 bg-[#34495E] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-gray-300">
              "The best platform to discover and manage events. Highly
              recommend!"
            </p>
            <h5 className="mt-4 font-bold text-yellow-300">— Alex Johnson</h5>
          </div>
          <div className="w-72 bg-[#34495E] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-gray-300">
              "Seamless experience from start to finish. Booking events has
              never been easier."
            </p>
            <h5 className="mt-4 font-bold text-yellow-300">— Maria Lopez</h5>
          </div>
        </div>

        <div className="w-full py-16 px-8  from-[#1F2937] via-[#2C3E50] to-[#1F2937] text-white flex items-center justify-center">
          <div className="w-full max-w-4xl bg-[#34495E] p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              List Your Event with Us
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Lowest fees and tailored features for your events. Partner with us
              and get your events listed on Swap Tickets.
            </p>
            <Link to="/create-event">
              <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium py-2 px-6 rounded-full hover:scale-105 transition-transform duration-300">
                Create an Event
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
