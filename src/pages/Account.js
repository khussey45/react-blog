import React from 'react';

function Account() {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">My Account</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">User Information</h3>
          <p>
            <strong>Username:</strong> YourUsername
          </p>
          <p>
            <strong>Email:</strong> your.email@example.com
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
        </div>
      </div>
    </div>
  );
}

export default Account;
