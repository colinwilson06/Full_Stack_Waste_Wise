import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { username, email, password } = values;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,
        password
      });
      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred during registration.";
      console.error("Sign Up Error:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white px-6 py-10 mb-20">
      {/* Left Section */}
      <div className="w-full md:w-1/2 px-4 md:px-10 sm:text-center md:text-left flex flex-col justify-center">
        <h1 className="text-green-800 janda-font text-5xl md:text-6xl lg:text-7xl leading-tight lg:leading-[1.1]">
          WELCOME!
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl max-w-lg sm:mx-auto md:mx-0 sm:text-center md:text-left">
          Join the WasteWise movement and turn trash into treasure!
          <br />
          Create your account to share green ideas, explore creative recycling, and connect with fellow eco-innovators.
          <br />
          Let’s make waste matter—sign up and start your journey today!
        </p>
      </div>

      {/* Right Section (Card) */}
      <div className="w-full max-w-md mt-10 md:mt-0 bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-green-700 text-3xl md:text-4xl font-bold text-center mb-6">Sign Up</h2>

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
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
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
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
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
            SIGN UP
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
