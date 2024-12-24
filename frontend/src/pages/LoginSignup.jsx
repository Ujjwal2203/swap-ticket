import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex flex-col md:flex-row"
      style={{ height: "calc(100vh - 64px)" }} // Adjust the height (64px) to match your navbar height
    >
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 justify-center items-center">
        <h1 className="text-6xl font-extrabold text-white text-center leading-tight px-4">
          Welcome to  <br /> <span className="underline decoration-pink-300">Swap Tickets</span>
        </h1>
      </div>

      {/* Right Panel */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 px-6 py-10">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-4 rounded-lg font-extrabold text-xl hover:bg-pink-600 transition-all"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-8 text-gray-700 text-lg font-medium">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
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
    </div>
  );
};

export default LoginSignup;
