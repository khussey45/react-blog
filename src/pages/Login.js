// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';

function Login() {
  const { setUser, setToken  } = useContext(UserContext); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);  // State for modal visibility
  const [errorMessage, setErrorMessage] = useState('');  // State for error messages
  const [loading, setLoading] = useState(false);  // State for loading status
  const navigate = useNavigate();



  //handle login 
  const handleLogin = async (event) => {
    event.preventDefault();
  
    // Clear any previous error messages and set loading status
    setErrorMessage('');
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
  });

  
      const data = await response.json();
      setLoading(false);  // Clear loading status
  
      if (response.ok) {
        console.log('Login successful:', data);
        setUser(data.user);
  
        // Save JWT token to localStorage
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('jwt_token', data.token);
        } else {
          console.warn('No token found in response. Please check the backend.');
        }
  
        setShowModal(true);  // Show the success modal
  
        // Redirect to Account page after a delay
        setTimeout(() => {
          setShowModal(false);
          navigate(`/dashboard/${data.user.username}`);
        }, 2000);
      } else {
        console.error('Login error:', data);
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoading(false);  // Clear loading status
      console.error('Network error:', error);
      setErrorMessage('Network error. Please try again later.');
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-black group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
          {loading ? (
            <>
              <span className="spinner"></span> Logging in...
            </>
          ) : 'Login'}            </button>
          </div>
        </form>
        <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} message="Successfully Signed In" />
      </div>
    </div>
  );
}

export default Login;
