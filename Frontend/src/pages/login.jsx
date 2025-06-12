import { Link, useAsyncError } from "react-router-dom";
import React, {useState} from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
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

          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Email or Username"
              type="text"
            />
            <input
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                id="unhide-password"
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <label>Unhide Password</label>
            </div>
            <Link to="/">
            <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 font-semibold cursor-pointer">
              SIGN IN
            </button>
            </Link>

            <Link to="/sign-up">
            <p className="text-center text-sm text-gray-600 mb-5 mt-5">
              Don’t have an account? <span className="font-semibold text-black">Sign up now</span>
            </p>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}