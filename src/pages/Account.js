// import React from 'react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; 

function Account() {
  const { user } = useContext(UserContext);
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">My Account</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">User Information</h3>
          <p>
            <strong>Username:</strong> {user?.username || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || 'N/A'}
          </p>
          {/* Add more user information here */}
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
          <p>
            You can manage your account settings here.
          </p>
          {/* Add account settings options and functionality here */}
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Actions</h3>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Update Profile
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 ml-2">
            Logout
          </button>
          {/* Add more action buttons as needed */}
          <div className="mb-4">
  <h3 className="text-xl font-semibold mb-2">Actions</h3>
  <Link to="/update-profile" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
    Update Profile
  </Link>
  <Link to="/delete-account" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 ml-2">
    Delete Account
  </Link>
</div>
        </div>
      </div>
    </div>
  );
}

export default Account;
