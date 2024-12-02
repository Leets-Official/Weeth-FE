import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const deleteUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.delete(`${BASE_URL}/api/v1/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export default deleteUser;
