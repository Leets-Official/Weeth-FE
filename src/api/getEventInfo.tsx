import { useState, useEffect } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

export const getEventInfo = async (
  type: string | undefined,
  id: string | undefined,
) => {
  return api.get(`/api/v1/${type}/${id}`);
};

export const useGetEventInfo = (type?: string, id?: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (id && type) {
          const response = await getEventInfo(type, id);
          if (response.data.code === 200) {
            setData(response.data.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err: any) {
        toastError('데이터를 불러오는 데에 실패했습니다.');
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  return { data, loading, error };
};

export default useGetEventInfo;
