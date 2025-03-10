/*
본인의 정보를 가져오는 api
마이페이지에서 사용됩니다.
*/

import { useEffect, useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

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

const getUserInfo = async () => {
  return api.get('/api/v1/users');
};

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await getUserInfo();
        const { data } = response.data;
        setUserInfo(data);
        setError(null);
      } catch (err: any) {
        toastError('데이터를 불러오지 못했습니다.');
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, userError, loading };
};

export default useGetUserInfo;
