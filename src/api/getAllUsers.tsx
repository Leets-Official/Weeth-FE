import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/users/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export default getAllUsers;
