/* eslint-disable react/require-default-props */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getYearlySchedule = async (start: string, end: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/schedules/yearly`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: {
      start,
      end,
    },
  });
};

export default getYearlySchedule;
