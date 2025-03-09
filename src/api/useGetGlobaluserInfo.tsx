/*
전역적으로 사용되는 본인의 정보를 가져오는 api
일반 userInfo와 다르게 dto가 축소되어있습니다.
*/

import { useEffect, useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

interface UserInfo {
  id: number;
  name: string;
  cardinals: number[];
  role: 'USER' | 'ADMIN';
}

const getUserInfo = async () => {
  return api.get(`/api/v1/users/info`);
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
        toastError('유저 정보를 불러오는 데에 실패했습니다.');
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
