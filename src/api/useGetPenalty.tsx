import { useEffect, useState } from 'react';
import api from './api';

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
  const response = await api.get(`/api/v1/penalties`);

  return response.data.data;
};

export const useGetPenalty = () => {
  const [penaltyInfo, setPenaltyInfo] = useState<UserPenaltyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenalty = async () => {
      try {
        const data = await getPenalty();
        setPenaltyInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '오류가 발생했습니다.');
      }
    };

    fetchPenalty();
  }, []);

  return { penaltyInfo, error };
};

export default useGetPenalty;
