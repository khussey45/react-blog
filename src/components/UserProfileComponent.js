// UserProfileComponent.js

import React, { useState, useEffect } from 'react';

function UserProfileComponent({ match }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user details using the username from the route params
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/user/${match.params.username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [match.params.username]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.username}</h1>
      {/* Display other user details here */}
    </div>
  );
}

export default UserProfileComponent;
