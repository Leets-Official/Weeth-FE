import { useEffect, useState } from 'react';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

export const getYearlySchedule = async (year: number, semester: number) => {
  return api.get(`/api/v1/schedules/yearly`, {
    params: {
      year,
      semester,
    },
  });
};

export const useGetYearlySchedule = ({
  year,
  semester,
}: {
  year: number;
  semester: number;
}) => {
  // TODO: 서버 수정 후 자세한 타입 지정
  const [data, setData] = useState<Record<number, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (year) {
          const response = await getYearlySchedule(year, semester);
          if (response.data.code === 200) {
            setData(response.data.data);
          } else {
            toastError('데이터를 불러오지 못했습니다.');
            setError(response.data.message);
          }
        }
      } catch (err: any) {
        toastError('데이터를 불러오지 못했습니다.');
        setError(err.response?.data?.message);
      }
    };
    fetchData();
  }, [year]);

  return { data, error };
};

export default useGetYearlySchedule;
