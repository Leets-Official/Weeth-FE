import { useEffect, useState } from 'react';
import axios from 'axios';
import { toastError } from '@/components/common/ToastMessage';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllCardinals = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/cardinals`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
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
        toastError('데이터를 불러오지 못했습니다.');
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
