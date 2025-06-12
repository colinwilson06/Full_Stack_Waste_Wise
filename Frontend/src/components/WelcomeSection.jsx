import React from 'react';
import { Link } from 'react-router';

export default function WelcomeSection() {
  return (
    <div className="bg-[#FBF5F5] rounded-2xl mt-10 p-8 mx-10 flex flex-col lg:flex-row items-center justify-between shadow-md">
      {/* Left Content */}
      <div className="lg:w-2/3 space-y-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-[42px] font-bold text-shadow-lg mt-9">Welcome to</h1>
          <img src="LogoWasteWise.svg" alt="Logo WasteWise" className="w-[192px]" />
        </div>

        <p className="border-l-4 w-190 border-gray-400 pl-4 text-[19px]">
          WasteWise is a platform to explore, share, and inspire eco-friendly creativity. 
          Transform everyday waste into useful, beautiful, or innovative items. Discover recycling tutorials, 
          learn from others, upload your own green projects, and be part of a community that believes every piece of waste has potential. 
          Together, let’s turn waste into something meaningful.
        </p>

      <div className="flex justify-center lg:justify-start ml-120 mt-15">
        <Link to="/login">
        <button className="bg-green-700 text-white text-[30px] font-semibold px-4 py-1 rounded-2xl hover:bg-green-800 transition duration-300 cursor-pointer">
          Let’s Begin
        </button>
        </Link>
      </div>
      </div>

      {/* Right Image */}
      <div className="flex justify-center">
        <img
          src="recycle-bins.svg"
          alt="Recycle bins"
          className="w-[897px] object-contain mt-10"
        />
      </div>
    </div>
  );
}
