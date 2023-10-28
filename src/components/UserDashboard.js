import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import DeleteAccount from '../pages/DeleteAccount';
import UpdateProfile from '../pages/UpdateProfile';
import { useParams, useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // for the delete modal
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/user/${username}`);

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();

        // Check for any server-side errors in the JSON response
        if (!response.ok) {
          throw new Error(data.error || "Server error");
        }

        setUserData(data);
      } else {
        // Handle plain text or other content types
        const text = await response.text();
        throw new Error(text);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } 
  };

  useEffect(() => {
     // Log the value of username
  console.log("Username from useParams:", username);

    fetchUserData();
  }, [username]);

    // Check if user is logged in
    if (!user) {
      navigate('/login'); 
      return null;
    }
  
    // Redirect if the username from params is not equal to logged-in user's username
    if (userData && user && userData.username !== user.username) {
      navigate('/not-authorized'); 
      return null;
    }

  if (!userData) return <div>Loading...</div>;

  // Redirect if the username from params is not equal to logged-in user's username
  if (userData && user && userData.username !== user.username) {
    navigate('/not-authorized');
    return null;
  }

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
          {/* Edit Profile and Delete Account buttons */}
          <button onClick={() => {/* Open UpdateProfile modal or navigate to UpdateProfile page */}}>
            Edit Profile
          </button>
          <button onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </button>
        </div>
      </div>

      {/* Show DeleteAccount modal */}
      {showDeleteModal && <DeleteAccount />}

      {/* Menu items */}
      <div className="border-b-2 pb-4 mb-6">
        <a href="#" className="mr-4 hover:underline">My Feed</a>
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

export default UserDashboard;
