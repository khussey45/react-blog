import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    // Fetch user details using the username from the route params

    const fetchUserData = async () => {
    try {
        const response = await fetch(`/user/${username}`);
        console.log('API Response:', response);  // log the raw response
        const data = await response.json();
        console.log('API Data:', data);  // log the parsed JSON data
        setUserData(data);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};


    fetchUserData();
  }, [username]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-8">
      {/* User details */}
      <div className="flex items-center mb-6">
        {/* Profile picture */}
        <img src={userData.profilePicture || "/default-profile2.png"} alt="Profile" className="rounded-full w-32 h-32 object-cover mr-6" />

        <div>
          {/* Name */}
          <h1 className="text-2xl font-bold">{userData.username}</h1>
          {/* Bio */}
          <p className="text-gray-600 mt-2">{userData.bio}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="border-b-2 pb-4 mb-6">
        <a href="#" className="mr-4 hover:underline">User Feed</a>
        <a href="#" className="mr-4 hover:underline">Projects</a>
        <a href="#" className="mr-4 hover:underline">Books</a>
        <a href="#" className="hover:underline">Self Study</a>
      </div>

      {/* Content area */}
      <div>
        {/* Content goes here based on the menu item selected */}
      </div>
    </div>
  );
}

export default UserProfile;
