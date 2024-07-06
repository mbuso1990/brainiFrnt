import React, { createContext, useContext } from 'react';
import { API_URL } from '../env';
import axios from 'axios';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

export const SubscriptionProvider = ({ children }) => {
  const initiateSubscription = async (userId, plan) => {
    try {
      const response = await axios.post(`${API_URL}/api/payment/subscribe`, {
        userId,
        plan,
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error initiating subscription:', error);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ initiateSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
