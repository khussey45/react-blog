// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Logout function
  const logout = () => {
    setUser(null);
    // If you're using tokens to manage session, you can remove the token here.
    // For instance: localStorage.removeItem('userToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
