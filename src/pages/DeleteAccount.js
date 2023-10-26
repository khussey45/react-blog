import React, { useContext, useState } from 'react';
import axios from 'axios';  
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(true); // This will show the modal as soon as the page is loaded

    const handleDelete = async () => {
        if (inputValue === `delete ${user.username}`) {
            try {
                await axios.delete('/delete', {
                    data: {
                        username: user.username
                    }
                });
                setUser(null);
                navigate('/login');
            } catch (error) {
                if (error.response) {
                    console.error("Error deleting account:", error.response.data);
                } else {
                    console.error("Error deleting account:", error.message);
                }
            }
        } else {
            alert('Please enter the correct confirmation text to delete your account.');
        }
    }

    return (
        <div className="relative">
            <h1 className="text-2xl font-bold mb-4">Delete Account Page</h1>

            {showModal && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg border-2 border-red-500 rounded-md">
                    <p className="mb-4">Are you absolutely sure you want to delete your account? If so type delete followed by username </p>
                    <input 
                        type="text" 
                        placeholder={`delete ${user.username}`} 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border p-2 rounded w-full mb-4"
                    />
                    {/* Red background for the delete button */}
                    <button 
                        onClick={handleDelete} 
                        className="bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600"
                    >
                        Confirm Delete
                    </button>
                    {/* Yellow background for the cancel button */}
                    <button 
                        onClick={() => setShowModal(false)} 
                        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteAccount;
