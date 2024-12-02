import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

const getMonthlySchedule = async (start: string, end: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/schedules/monthly`, {
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

export const useGetMonthlySchedule = (start: string, end: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthlySchedule(start, end);
        if (response.data.code === 200) {
          setData(response.data.data);
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || '데이터를 불러오지 못했습니다.',
        );
      }
    };

    fetchData();
  }, [start, end]);

  return { data, error };
};

export default useGetMonthlySchedule;
