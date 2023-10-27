import React, { useState, useContext } from 'react';  
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory(); // <-- Initialize the hook here

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle search function
  const handleSearch = async () => {
    if(!searchQuery) return;
    
    try {
        const response = await fetch(`/api/search?query=${searchQuery}`);
        const data = await response.json();

        console.log(data);

        // Assuming you want the first user result and redirect to their page:
        const user = data[0];
        if (user) {
          history.push(`/user/${user.username}`);
        }
        
        // Process the data, display it on the page or navigate to a results page, etc.
    } catch (error) {
        console.error("Error searching:", error);
    }
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
          <Link to="/news" className="text-white py-2" onClick={closeMenu}>News</Link>
          <div className="relative text-white py-2">

          <input 
    type="text" 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)} 
    placeholder="Search..."
    className="bg-gray-600 rounded-md px-3 py-1 w-40"
    onKeyPress={(event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }}
/>
<span 
    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer" 
    onClick={handleSearch}
>
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
</span>


          </div>

          {user ? (
            <>
              <Link to="/account" className="bg-blue-600 w-16 text-white py-2" onClick={closeMenu}>
                My Account
              </Link>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 w-12 text-white py-2" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 w-16 text-white py-2" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
