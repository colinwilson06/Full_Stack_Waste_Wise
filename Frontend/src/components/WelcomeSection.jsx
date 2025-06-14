import React from 'react';
import { Link } from 'react-router';

export default function WelcomeSection() {
  return (
    <div className="bg-[#FBF5F5] rounded-2xl mt-10 p-6 sm:p-8 mx-4 sm:mx-6 md:mx-10 flex flex-col lg:flex-row items-center justify-between shadow-md">
      {/* Left Content */}
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
          <h1 className="text-3xl sm:text-[36px] md:text-[42px] font-bold mt-4 sm:mt-9 text-shadow-lg">
            Welcome to
          </h1>
          <img
            src="LogoWasteWise.svg"
            alt="Logo WasteWise"
            className="w-44 sm:w-[192px] mt-2 sm:mt-0"
          />
        </div>

        <p className="border-l-4 border-gray-400 pl-4 text-[16px] sm:text-[18px] md:text-[19px]">
          WasteWise is a platform to explore, share, and inspire eco-friendly creativity.
          Transform everyday waste into useful, beautiful, or innovative items. Discover recycling tutorials,
          learn from others, upload your own green projects, and be part of a community that believes every piece of waste has potential.
          Together, let’s turn waste into something meaningful.
        </p>

        <div className="flex justify-center sm:justify-start mt-4">
          <Link to="/login">
            <button className="bg-green-700 text-white text-lg sm:text-xl md:text-[30px] font-semibold px-4 py-2 rounded-2xl hover:bg-green-800 transition duration-300">
              Let’s Begin
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/3 flex justify-center mt-6 lg:mt-0">
        <img
          src="recycle-bins.svg"
          alt="Recycle bins"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[897px] object-contain"
        />
      </div>
    </div>
  );
}
