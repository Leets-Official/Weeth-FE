import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 출석 정보 받아오는 API
const getAttendCheck = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/attendances/detail`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetAttendCheck = () => {
  const [attendCheckInfo, setAttendCheckInfo] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendCheck = async () => {
      try {
        const response = await getAttendCheck();
        const { data } = response.data;
        setAttendCheckInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchAttendCheck();
  }, []);

  return { attendCheckInfo, error };
};

export default useGetAttendCheck;
