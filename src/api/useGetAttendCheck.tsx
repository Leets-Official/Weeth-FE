import { useEffect, useState } from 'react';
import api from './api';

interface Attendance {
  id: number;
  status: 'ATTEND' | 'PENDING' | 'ABSENT';
  weekNumber: number;
  title: string;
  start: string;
  end: string;
  location: string;
}

interface AttendanceData {
  attendanceCount: number;
  total: number;
  absenceCount: number;
  attendances: Attendance[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: AttendanceData;
}

// 출석 조회 정보 받아오는 API
const getAttendCheck = async (): Promise<AttendanceData> => {
  const response = await api.get<ApiResponse>(`/api/v1/attendances/detail`);

  return response.data.data;
};

export const useGetAttendCheck = () => {
  const [attendCheckInfo, setAttendCheckInfo] = useState<AttendanceData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendCheck = async () => {
      try {
        const data = await getAttendCheck();
        setAttendCheckInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '오류가 발생했습니다.');
      }
    };

    fetchAttendCheck();
  }, []);

  return { attendCheckInfo, error };
};

export default useGetAttendCheck;
