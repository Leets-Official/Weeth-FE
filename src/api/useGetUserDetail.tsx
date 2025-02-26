import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toastError } from '@/components/common/ToastMessage';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  studentId: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE';
  role: 'ADMIN' | 'USER';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) throw new Error('Invalid userId');
        setLoading(true);
        const numericUserId = parseInt(userId, 10);
        const response = await getUserDetail(numericUserId);
        setUserDetail(response.data.data);
        setError(null);
      } catch (err: any) {
        toastError('데이터를 불러오지 못했습니다.');
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userDetail, error, loading };
};

export default useGetUserDetail;
