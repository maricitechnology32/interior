import React, { createContext, useState, useEffect } from 'react';
import api from '../api/apiSlice'; // We'll use this for login/logout

// 1. Create the Context
export const AuthContext = createContext(null);

// 2. Create the Provider
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // For checking auth status on load

  // 3. Check for existing login on component mount
  useEffect(() => {
    try {
      // Get user info from localStorage
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const userData = JSON.parse(storedUserInfo);
        // Set the user in our state
        setUserInfo(userData);
        // Also update the default auth header in our apiSlice
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${userData.token}`;
      }
    } catch (error) {
      console.error('Failed to parse user info from localStorage', error);
      // Clear bad data
      localStorage.removeItem('userInfo');
    }
    setLoading(false);
  }, []);

  // 4. Login Function
  const login = (userData) => {
    // Store user info in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userData));
    // Set the user in our state
    setUserInfo(userData);
    // Set the auth header for all future API requests
    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userData.token}`;
  };

  // 5. Logout Function
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem('userInfo');
    // Remove from state
    setUserInfo(null);
    // Remove the auth header
    delete api.defaults.headers.common['Authorization'];
  };

  // 6. Provide these values to all children
  const value = {
    userInfo,
    isLoggedIn: !!userInfo,
    isAdmin: userInfo?.role === 'Admin',
    loading,
    login,
    logout,
  };

  // We don't render anything until we've checked localStorage
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};