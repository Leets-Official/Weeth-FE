import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface UserInfo {
  id: number;
  name: string;
  cardinals: number[];
  role: 'USER' | 'ADMIN';
}

const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/users/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetUserInfo = () => {
  const [globalInfo, setGlobalInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);

      try {
        const response = await getUserInfo();
        setGlobalInfo(response.data.data);
        setIsAdmin(response.data.data.role === 'ADMIN');
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { globalInfo, isAdmin, loading, error };
};

export default useGetUserInfo;
