import React, { useState, useContext } from 'react';  // Import React first
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
function Navbar() {
  console.log('Navbar rendered');
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);  // Get user state from UserContext

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

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
        </div>
        <div className={`flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden lg:flex'} lg:justify-end lg:space-x-4`}>
          <Link to="/" className="text-white py-2" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="text-white py-2" onClick={closeMenu}>About</Link>
          <Link to="/projects" className="text-white py-2" onClick={closeMenu}>Projects</Link>
          <Link to="/contact" className="text-white py-2" onClick={closeMenu}>Contact</Link>
          {user ? (
            <button className="bg-blue-600 w-16 text-white py-2" onClick={closeMenu}>
              My Account
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 w-12 text-white py-2" onClick={closeMenu}>
              Login
            </Link>
          )}
          <Link to="/register" className="bg-indigo-600 w-16 text-white py-2" onClick={closeMenu}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
