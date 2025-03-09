import { useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

export const patchMyInfo = async (data: Record<string, any>) => {
  return api.patch(`/api/v1/users`, data);
};

export const usePatchMyInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateInfo = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await patchMyInfo(data);
      setError(null);
      return response;
    } catch (err: any) {
      toastError('데이터를 불러오지 못했습니다.');
      setError(err.response?.data?.message || '오류가 발생했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateInfo, loading, error };
};

export default usePatchMyInfo;
