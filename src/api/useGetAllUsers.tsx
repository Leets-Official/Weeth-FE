import { toastError } from '@/components/common/ToastMessage';
import axios from 'axios';
import { useEffect } from 'react';

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

const useGetAllUsers = (
  cardinal: number | null,
  pageNumber: number,
  setUsers: React.Dispatch<React.SetStateAction<any[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await getAllUsers(cardinal, pageNumber);
      const { data } = response.data;

      setUsers((prevUsers) => [...prevUsers, ...data.content]);
      setHasMore(!data.last);
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cardinal, pageNumber]);
};

export default useGetAllUsers;
