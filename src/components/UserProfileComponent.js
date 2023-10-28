// TODO this should be removed if not being used



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfileComponent() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    // Fetch user details using the username from the route params
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/user/${username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.username}</h1>
      {/* Display other user details here */}
    </div>
  );
}

export default UserProfileComponent;
