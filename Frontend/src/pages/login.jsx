import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleCheckboxChange = () => setShowPassword(!showPassword);
  const handleChanges = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/");
        window.dispatchEvent(new Event("usernameChanged"));
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Don't have an account? Sign up now.";
      alert(message);
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white px-6 py-10 mb-20">
      {/* Left Section */}
      <div className="w-full md:w-1/2 px-4 md:px-10 sm:text-center md:text-left flex flex-col justify-center mb-30 lg:mb-10">
        <h1 className="text-green-800 janda-font text-5xl md:text-6xl lg:text-7xl leading-tight lg:leading-[1.1]">
          WELCOME <br /> BACK!
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-lg lg:text-xl max-w-lg sm:mx-auto md:mx-0 sm:text-center md:text-left">
          Keep transforming waste into something meaningful.
          <br />
          Sign in to explore new ideas, share your latest eco-creations, and stay inspired with our green community.
        </p>
      </div>


      {/* Right Section */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-green-700 text-3xl md:text-4xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChanges}
            required
          />
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChanges}
            required
          />
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="unhide-password"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="unhide-password">Unhide Password</label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 font-semibold cursor-pointer"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="font-semibold text-black">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
