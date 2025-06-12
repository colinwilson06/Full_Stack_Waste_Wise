import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const handleStorageChange = () => {
      const newUsername = localStorage.getItem("username");
      setUsername(newUsername);
    };

    window.addEventListener("usernameChanged", handleStorageChange);

    return () => {
      window.removeEventListener("usernameChanged", handleStorageChange);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
  };

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

            {username ? (
              <div className="flex items-center gap-3 -mr-10 ml-3">
                <span className="text-[20px] font-bold text-[#2E7D32]">Hello, {username}</span>
                <button
                  onClick={handleLogout}
                  className="text-[15px] text-green-500 underline hover:text-green-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="text-[27px] font-bold text-white bg-[#2E7D32] border-3 border-[#2E7D32] px-6 rounded-full hover:bg-white hover:text-[#93E097] hover:border-[#93E097]">
                Login
              </NavLink>
            )}
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
            
            {username ? (
              <div className="flex items-center justify-between px-2">
                <span className="text-lg font-bold text-[#2E7D32]">Hello, {username}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-sm text-green-500 underline hover:text-green-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="text-lg font-bold text-white bg-[#2E7D32] border-3 border-[#2E7D32] px-4 py-2 rounded-full hover:bg-white hover:text-[#93E097] hover:border-[#93E097] flex items-center justify-center" onClick={() => setIsOpen(false)}>Login</NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
