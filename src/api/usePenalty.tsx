import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Penalty {
  penaltyId: number;
  penaltyDescription: string;
  time: string;
}

interface UserPenaltyData {
  userId: number;
  penaltyCount: number;
  name: string;
  Penalties: Penalty[];
}

const getPenalty = async (): Promise<UserPenaltyData> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios.get(`${BASE_URL}/api/v1/penalties`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });

  return response.data.data;
};

export const useGetPenalty = () => {
  const [penaltyInfo, setPenaltyInfo] = useState<UserPenaltyData | null>(null);
  const [myPenalty, setMyPenalty] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenalty = async () => {
      try {
        const data = await getPenalty();
        setPenaltyInfo(data);
        setMyPenalty(data.penaltyCount);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '오류가 발생했습니다.');
      }
    };

    fetchPenalty();
  }, []);

  return { penaltyInfo, myPenalty, error };
};

export default useGetPenalty;
