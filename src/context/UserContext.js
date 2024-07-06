import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { API_URL } from '../env';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, updatePaymentStatus } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const fetchUser = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(`${API_URL}/api/users/${user._id}`);
        if (JSON.stringify(response.data) !== JSON.stringify(userData)) {
          setUserData(response.data);
          updatePaymentStatus(response.data.hasPaid);
          console.log('Fetched user data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    }
  }, [user, userData, updatePaymentStatus]);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
