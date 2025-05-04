import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login, logout, register } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    setUser(user);
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const user = await login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const user = await register(name, email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
