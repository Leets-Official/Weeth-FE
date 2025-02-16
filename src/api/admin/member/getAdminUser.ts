import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async (orderBy = 'NAME_ASCENDING') => {
  const accessToken = localStorage.getItem('accessToken');

  return axios.get(`${BASE_URL}/api/v1/admin/users/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { orderBy },
  });
};

export default getAllUsers;
