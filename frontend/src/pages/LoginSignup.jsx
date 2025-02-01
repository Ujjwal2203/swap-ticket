import React, { useState } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-200 via-green-100 to-blue-100 px-4 overflow-hidden">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl animate__animated animate__fadeIn">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center tracking-wide">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>
        <form>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-4 rounded-lg font-extrabold text-xl hover:bg-pink-600 transition-all transform hover:scale-105"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="flex items-center justify-between mt-6">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-medium">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <button className="flex items-center justify-center bg-white border-2 border-gray-300 py-3 px-4 rounded-lg shadow-md hover:scale-110 transform transition duration-300 ease-in-out hover:shadow-xl">
            <FaGoogle className="text-blue-500 text-2xl transition-all" />
          </button>
          <button className="flex items-center justify-center bg-white border-2 border-gray-300 py-3 px-4 rounded-lg shadow-md hover:scale-110 transform transition duration-300 ease-in-out hover:shadow-xl">
            <FaGithub className="text-gray-800 text-2xl transition-all" />
          </button>
          <button className="flex items-center justify-center bg-white border-2 border-gray-300 py-3 px-4 rounded-lg shadow-md hover:scale-110 transform transition duration-300 ease-in-out hover:shadow-xl">
            <FaFacebook className="text-blue-600 text-2xl transition-all" />
          </button>
        </div>
        <div className="text-center mt-8 text-gray-700 text-lg font-medium">
          {isLogin ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-pink-500 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-pink-500 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
