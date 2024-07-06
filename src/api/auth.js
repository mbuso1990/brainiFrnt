import axios from 'axios';

const API_URL = 'https://brainni.onrender.com'; // Update with your backend server's IP address and port

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
    console.log('Registration response data:', response.data); // Log the response data
    console.log('Full registration response:', response); // Log the full response
    console.log('Registered user data:', response.data.user); // Log the user data
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    console.log('Login response data:', response.data); // Log the response data
    console.log('Full login response:', response); // Log the full response
    console.log('Logged-in user data:', response.data.user); // Log the user data
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const updateUserOnboarding = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/api/onboarding/update`, userData, {
      withCredentials: true // This ensures cookies (including sessions) are sent with the request
    });
    // console.log('Update response data:', response.data);
    // console.log('Updated user data:', response.data.user);
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};
