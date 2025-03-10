import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-200 via-green-100 to-blue-100 px-4 overflow-hidden">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl animate__animated animate__fadeIn">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center tracking-wide">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        {isLogin ? <Login /> : <Signup />}

        <div className="mt-6 text-center">
          <button
            className="text-teal-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setIsLogin, setUserName  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    axios.post('http://localhost:8000/ticket/login', { email, password })
      .then(result => {
        console.log(result);
        setSuccessMessage("Login successful!");
        // setUserName(name);
        setIsLogin(true);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

// Signup Form Component
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    axios.post('http://localhost:8000/auth/register', { userName: name, email, password })
      .then(result => {
        console.log(result);
        setSuccessMessage("Signup successful! You can now log in.");
        setError('');
        setTimeout(() => {
          window.location.href = '/login-signup'; // Redirect to login page
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Signup
      </button>
    </form>
  );
};

export default LoginSignup;
