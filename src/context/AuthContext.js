// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../env';
import getUserByUsername from '../utils/getUserByUsername';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const cachedAdditionalUserData = await AsyncStorage.getItem(`additionalUserData_${parsedUser.username}`);
          if (cachedAdditionalUserData) {
            const parsedCachedData = JSON.parse(cachedAdditionalUserData);
            setUser({ ...parsedUser, ...parsedCachedData });
          } else {
            const additionalUserData = await getUserByUsername(parsedUser.username);
            await AsyncStorage.setItem(`additionalUserData_${parsedUser.username}`, JSON.stringify(additionalUserData));
            setUser({ ...parsedUser, ...additionalUserData });
          }
        } else {
          console.log('No user found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      console.log(`Attempting to log in with username: ${username}`);
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      console.log('Login successful:', response.data);
      const userData = response.data.user;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      const cachedAdditionalUserData = await AsyncStorage.getItem(`additionalUserData_${username}`);
      if (cachedAdditionalUserData) {
        const parsedCachedData = JSON.parse(cachedAdditionalUserData);
        setUser({ ...userData, ...parsedCachedData });
        return { ...userData, ...parsedCachedData };
      } else {
        const additionalUserData = await getUserByUsername(username);
        await AsyncStorage.setItem(`additionalUserData_${username}`, JSON.stringify(additionalUserData));
        const combinedUserData = { ...userData, ...additionalUserData };
        setUser(combinedUserData);
        return combinedUserData;
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      if (error.response) {
        const { message } = error.response.data;
        if (message === 'User not found' || message === 'Incorrect password') {
          alert(message);
        }
      }
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log(`Attempting to register with username: ${username} and email: ${email}`);
      const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
      const userData = response.data.user;
      console.log('Registration successful:', userData);
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      const additionalUserData = await getUserByUsername(username);
      console.log('Additional user data fetched on registration:', additionalUserData);
      const combinedUserData = { ...userData, ...additionalUserData };
      setUser(combinedUserData);
      return combinedUserData;
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting to log out user:', user ? user.username : 'No user logged in');
      await AsyncStorage.removeItem('user');
      setUser(null);
      console.log('User has logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      console.log(`Attempting to request password reset for email: ${email}`);
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      console.log('Password reset email sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const updatePaymentStatus = async (hasPaid) => {
    try {
      setUser((prevUser) => ({
        ...prevUser,
        hasPaid,
      }));
      await AsyncStorage.setItem('user', JSON.stringify({ ...user, hasPaid }));
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, updatePaymentStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
