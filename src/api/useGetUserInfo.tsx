import { useEffect, useState } from 'react';
import api from './api';

// TODO: dto 변경시 수정
interface UserInfo {
  id: number;
  name: string;
  email: string;
  studentId: string;
  tel: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE' | string;
  role: 'USER' | 'ADMIN' | string;
}

// 유저 정보 받아오는 API
const getUserInfo = async () => {
  return api.get('/api/v1/users');
};

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userError, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getUserInfo();
        const { data } = response.data;
        setUserInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, userError, isLoading };
};

export default useGetUserInfo;
