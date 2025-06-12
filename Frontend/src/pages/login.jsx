import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    username: '', // <--- Ganti 'email' menjadi 'username' di state
    password: ''
  });

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // *** PERBAIKAN DI SINI: Ubah URL API ***
      const response = await axios.post('/auth/login', { // <-- Hapus '/api' di sini
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        // Backend Anda sudah mengembalikan 'username' di respons login,
        // jadi Anda tidak perlu melakukan permintaan '/api/auth/home' lagi.
        // Ini menghemat satu panggilan API.
        localStorage.setItem("username", response.data.username); // <-- Ambil langsung dari response login

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
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-50">
      {/* Left Section */}
      <div className="w-1/2 text-left -mt-40 px-10">
        <h1 className="text-green-800 janda-font text-[100px] leading-tight">
          WELCOME <br /> BACK!
        </h1>
        <p className="mt-4 text-gray-600 text-[16px] max-w-md">
          Keep transforming waste into something meaningful.
          <br />
          Sign in to explore new ideas, share your latest eco-creations, and stay inspired with our green community.
        </p>
      </div>

      {/* Right Section (Card) */}
      <div className="w-[450px] bg-white shadow-2xl rounded-4xl p-15 mb-30">
        <h2 className="text-green-700 text-[42px] font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            type="text"
            name="username" // <--- Ganti 'name="email"' menjadi 'name="username"'
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

        <p className="text-center text-sm text-gray-600 mb-5 mt-5">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="font-semibold text-black">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}