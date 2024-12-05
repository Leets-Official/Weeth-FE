import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 출석 정보 받아오는 API
const getAttend = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/attendances`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetAttend = () => {
  const [attendInfo, setAttendInfo] = useState<any[]>([]);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttend = async () => {
      try {
        const response = await getAttend();
        const { data } = response.data;
        setAttendInfo(data);
        setError(null);

        if (data.title && data.start) {
          setHasSchedule(true);
        }
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchAttend();
  }, []);

  return { attendInfo, hasSchedule, error };
};

export default useGetAttend;
