import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Add token state

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null); // Clear token on logout
    // If you're storing the token in localStorage, you can remove it here.
    localStorage.removeItem('userToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
