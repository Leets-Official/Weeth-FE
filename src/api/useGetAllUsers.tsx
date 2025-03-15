import { useEffect, useState } from 'react';
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
  setHasNoMember: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [loading, setLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true); // 최초 렌더링을 추적

  const fetchUsers = async () => {
    setLoading(true);
    setObserverLoading(true);

    try {
      const response = await getAllUsers(cardinal, pageNumber);
      const { data } = response.data;

      setUsers((prevUsers) => [...prevUsers, ...data.content]);
      setHasMore(!data.last);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      if (error.status === 404) {
        setHasNoMember(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setObserverLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      fetchUsers();
    }
  }, [cardinal, pageNumber, isFirstRender]); // 최초 렌더링 이후 실행

  return { loading };
};

export default useGetAllUsers;
