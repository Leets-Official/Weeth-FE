import { useEffect, useState } from 'react';
import api from './api';

export const getAllCardinals = async () => {
  return api.get(`/api/v1/cardinals`);
};

export const useGetAllCardinals = () => {
  const [allCardinals, setAllCardinals] = useState<
    {
      status: string; // 기수 상태값 추가 ( IN_PROGRESS 이면 현재 기수 )
      id: number;
      cardinalNumber: number;
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);

      try {
        const response = await getAllCardinals();
        setAllCardinals(response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    fetchUsers();
  }, []);

  return { allCardinals, error };
};

export default useGetAllCardinals;
