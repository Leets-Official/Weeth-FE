import api from '@/api/api';
import { useState, useEffect } from 'react';

const getAllUsers = async (orderBy = 'NAME_ASCENDING') => {
  return api.get(`/api/v1/admin/users/all`, {
    params: { orderBy },
  });
};

const useGetAdminUsers = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    fetchUsers();
  }, []);

  return { allUsers, error };
};

export { getAllUsers, useGetAdminUsers };
