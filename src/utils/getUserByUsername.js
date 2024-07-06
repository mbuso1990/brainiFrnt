import axios from 'axios';
import { API_URL } from '../env'; // Adjust the path if necessary

const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/user-id/${username}`);
    const userData = response.data.user;
    // console.log('User data fetched successfully:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// const logout = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
//     console.log(response.data.message); // Logout successful
//   } catch (error) {
//     console.error('Error logging out:', error.response ? error.response.data : error.message);
//   }
// };


export default getUserByUsername;
