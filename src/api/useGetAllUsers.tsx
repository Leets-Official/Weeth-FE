import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async (
  cardinal: number | null,
  pageNumber: number,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const params: Record<string, any> = {
    pageNumber,
    pageSize: 10,
  };

  if (cardinal) {
    params.cardinal = cardinal;
  }

  return axios.get(`${BASE_URL}/api/v1/users/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params,
  });
};

export const useGetAllUsers = ({
  cardinal,
  pageNumber,
}: {
  cardinal: number | null;
  pageNumber: number;
}) => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);

      try {
        const response = await getAllUsers(cardinal, pageNumber);
        setAllUsers(response.data.data.content);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    fetchUsers();
  }, [cardinal, pageNumber]);

  return { allUsers, error };
};

export default useGetAllUsers;