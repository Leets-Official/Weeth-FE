import { useEffect, useState } from 'react';
import api from './api';

export const getYearlySchedule = async (start: string, end: string) => {
  return api.get(`/api/v1/schedules/yearly`, {
    params: {
      start,
      end,
    },
  });
};

export const useGetYearlySchedule = (year: string) => {
  // TODO: 서버 수정 후 자세한 타입 지정
  const [data, setData] = useState<Record<number, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (year) {
          const response = await getYearlySchedule(
            `${year}-01-01T00:00:00.000Z`,
            `${year}-12-31T23:59:59.999Z`,
          );
          if (response.data.code === 200) {
            setData(response.data.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };
    fetchData();
  }, [year]);

  return { data, error };
};

export default useGetYearlySchedule;
