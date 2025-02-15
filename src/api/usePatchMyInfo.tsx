import { useState } from 'react';
import api from './api';

const BASE_URL = import.meta.env.VITE_API_URL;

export const updateUserInfo = async (data: Record<string, any>) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return api.patch(`${BASE_URL}/api/v1/users`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useUpdateUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateInfo = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await updateUserInfo(data);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || '오류가 발생했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateInfo, loading, error };
};

export default useUpdateUserInfo;
