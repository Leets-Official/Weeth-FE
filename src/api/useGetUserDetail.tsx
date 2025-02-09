import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  studentId: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE';
}

export const getUserDetail = async (userId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/users/details`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: { userId },
  });
};

export const useGetUserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) throw new Error('Invalid userId');
        const numericUserId = parseInt(userId, 10);
        const response = await getUserDetail(numericUserId);
        setUserDetail(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchUser();
  }, [userId]);

  return { userDetail, error };
};

export default useGetUserDetail;
