import { useEffect, useState } from 'react';
import api from './api';

interface AttendInfo {
  title: string;
  location: string;
  start: string;
  end: string;
  attendanceRate: number;
}

// 출석 정보 받아오는 API
const getAttend = async () => {
  return api.get(`/api/v1/attendances`);
};

export const useGetAttend = () => {
  const [attendInfo, setAttendInfo] = useState<AttendInfo | null>(null);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttend = async () => {
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
      }
    };

    fetchAttend();
  }, []);

  return { attendInfo, hasSchedule, error };
};

export default useGetAttend;
