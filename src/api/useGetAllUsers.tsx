import { useEffect } from 'react';
import api from './api';

export const getAllUsers = async (
  cardinal: number | null,
  pageNumber: number,
) => {
  const params: Record<string, any> = {
    pageNumber,
    pageSize: 10,
  };

  if (cardinal) {
    params.cardinal = cardinal;
  }

  return api.get(`/api/v1/users/all`, { params });
};

const useGetAllUsers = (
  cardinal: number | null,
  pageNumber: number,
  setUsers: React.Dispatch<React.SetStateAction<any[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setObserverLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const fetchUsers = async () => {
    setObserverLoading(true);

    try {
      const response = await getAllUsers(cardinal, pageNumber);
      const { data } = response.data;

      setUsers((prevUsers) => [...prevUsers, ...data.content]);
      setHasMore(!data.last);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error);
    } finally {
      setObserverLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cardinal, pageNumber]);
};

export default useGetAllUsers;
