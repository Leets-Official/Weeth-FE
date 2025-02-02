import { useEffect, useState } from 'react';
import api from './api';

export const getAllUsers = async () => {
  return api.get(`/api/v1/users/all`);
};

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchUsers();
  }, []);

  return { allUsers, error };
};

export default useGetAllUsers;
