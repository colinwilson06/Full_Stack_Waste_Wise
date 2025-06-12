import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full px-5">
      <div className="lg:container w-full mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="logo_wrapper">
            <Link to="/">
              <img src="LogoWasteWise.svg" className="w-[192px]" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[3.5rem] px-15">
            <NavLink to="/" className="text-[27px] font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]">Home</NavLink>
            <NavLink to="/search" className="text-[27px] font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]">Search</NavLink>
            <NavLink to="/upload" className="text-[27px] font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]">Upload</NavLink>
            <NavLink to="/login" className="text-[27px] font-bold text-white bg-[#2E7D32] border-3 border-[#2E7D32] px-6 rounded-full hover:bg-white hover:text-[#93E097] hover:border-[#93E097]">Login</NavLink>
          </nav>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden text-[#2E7D32] focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 px-2 pb-4">
            <NavLink to="/" className="text-lg font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/search" className="text-lg font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]" onClick={() => setIsOpen(false)}>Search</NavLink>
            <NavLink to="/upload" className="text-lg font-bold text-[#2E7D32] hover:underline hover:text-[#93E097]" onClick={() => setIsOpen(false)}>Upload</NavLink>
            <NavLink to="/login" className="text-lg font-bold text-white bg-[#2E7D32] border-3 border-[#2E7D32] px-4 py-2 rounded-full hover:bg-white hover:text-[#93E097] hover:border-[#93E097] flex items-center justify-center" onClick={() => setIsOpen(false)}>Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}


