import { useEffect, useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

export const getMonthlySchedule = async (start: string, end: string) => {
  return api.get(`/api/v1/schedules/monthly`, {
    params: {
      start,
      end,
    },
  });
};

export const useGetMonthlySchedule = (start: string, end: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMonthlySchedule(start, end);
        if (response.data.code === 200) {
          setData(response.data.data);
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        toastError('데이터를 불러오지 못했습니다.');
        setError(
          err.response?.data?.message || '데이터를 불러오지 못했습니다.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [start, end]);

  return { data, loading, error };
};

export default useGetMonthlySchedule;
