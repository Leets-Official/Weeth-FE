import axios from 'axios';
import { useEffect, useState } from 'react';

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

export const useGetYearlySchedule = (year: string) => {
  // TODO: 서버 수정 후 자세한 타입 지정
  const [data, setData] = useState<Record<number, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (year) {
          const response = await getYearlySchedule(
            `${year}-01-01T00:00:00.000Z`,
            `${year}-12-31T23:59:59.999Z`,
          );
          if (response.data.code === 200) {
            setData(response.data.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };
    fetchData();
  }, [year]);

  return { data, error };
};

export default useGetYearlySchedule;
