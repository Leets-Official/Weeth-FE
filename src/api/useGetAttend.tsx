import { useEffect, useState } from 'react';
import api from './api';

interface AttendInfo {
  title: string;
  location: string;
  start: string;
  end: string;
  attendanceRate: number;
  status: string;
}

// 출석 정보 받아오는 API
const getAttend = async () => {
  return api.get(`/api/v1/attendances`);
};

export const useGetAttend = (isAttend: boolean) => {
  const [attendInfo, setAttendInfo] = useState<AttendInfo | null>(null);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttend = async () => {
      setIsLoading(true);
      try {
        const response = await getAttend();
        const { data } = response.data;
        setAttendInfo(data);
        setError(null);

        if (data.title && data.start) {
          setHasSchedule(true);
        }
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttend();
  }, [isAttend]);

  return { attendInfo, hasSchedule, isLoading, error };
};

export default useGetAttend;
