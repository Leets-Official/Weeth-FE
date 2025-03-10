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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenalty = async () => {
      setIsLoading(true);
      try {
        const data = await getPenalty();
        setPenaltyInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPenalty();
  }, []);

  return { penaltyInfo, isLoading, error };
};

export default useGetPenalty;
