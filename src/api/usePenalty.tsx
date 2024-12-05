import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 출석 정보 받아오는 API
const getPenalty = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/penalties`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetPenalty = () => {
  const [PenaltyInfo, setPenaltyInfo] = useState<any[]>([]);
  const [myPenalty, setMyPenalty] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenalty = async () => {
      try {
        const response = await getPenalty();
        const { data } = response.data;
        setPenaltyInfo(data);
        setMyPenalty(data.penaltyCount);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchPenalty();
  }, []);

  return { PenaltyInfo, myPenalty, error };
};

export default useGetPenalty;
