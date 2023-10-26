import React, { useContext } from 'react';
import axios from 'axios';  
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);  // <-- Fetch user from context

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to permanently delete your account?")) {
            try {
                await axios.delete('/delete', {
                    data: {
                        username: user.username // <-- Send username with request
                    }
                });
                setUser(null);  // Reset the user context
                navigate('/login');  // Redirect the user after account deletion
            } catch (error) {
                if (error.response) {
                    console.error("Error deleting account:", error.response.data);
                } else {
                    console.error("Error deleting account:", error.message);
                }
            }
        }
    }

    return (
        <div>
            <h1>Delete Account Page</h1>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDelete}>Delete My Account</button>
        </div>
    );
}

export default DeleteAccount;
