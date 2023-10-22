// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">My Portfolio</div>
          <div className="block lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className={`lg:flex ${isOpen ? 'flex flex-col' : 'hidden'} lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}>
            <Link to="/" className="text-white py-2">Home</Link>
            <Link to="/about" className="text-white py-2">About</Link>
            <Link to="/projects" className="text-white py-2">Projects</Link>
            <Link to="/contact" className="text-white py-2">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
