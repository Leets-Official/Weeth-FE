import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getEventInfo = async (
  type: string | undefined,
  id: number | undefined,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/${type}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export default getEventInfo;
