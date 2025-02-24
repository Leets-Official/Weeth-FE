import { useEffect, useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

const getMonthlySchedule = async (start: string, end: string) => {
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

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, [start, end]);

  return { data, error };
};

export default useGetMonthlySchedule;
