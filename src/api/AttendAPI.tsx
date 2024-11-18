import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AttendContext } from '@/api/AttendContext';
import { AttendCheckContext } from '@/api/AttendCheckContext';
import { PenaltyContext } from '@/api/PenaltyContext';

// 공통으로 사용하는 토큰, URL, 헤더 설정 함수
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    Authorization: `Bearer ${accessToken}`,
    Authorization_refresh: `Bearer ${refreshToken}`,
  };
};

// 공통 API 호출 함수
const fetchData = async (
  url: string,
  headers: object,
  errorHandler: (error: any) => void,
) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error: any) {
    errorHandler(error.message);
    // 에러 발생 시 에러 전달
    throw error;
  }
};

// 출석 정보 받아오는 API
export const AttendAPI = () => {
  const { setAttendanceData, setAttendFetchError, setHasSchedule } =
    useContext(AttendContext);

  useEffect(() => {
    const fetchAttendances = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const headers = getAuthHeaders();

      const response = await fetchData(
        `${BASE_URL}/api/v1/attendances`,
        headers,
        setAttendFetchError,
      );
      const { data } = response;
      setAttendanceData(data);

      if (data.title && data.start) {
        setHasSchedule(true);
      }
    };

    fetchAttendances();
  }, [setAttendanceData, setAttendFetchError, setHasSchedule]);

  return null;
};

// 출석 조회 정보 받아오는 API
export const AttendCheckAPI = () => {
  const { setAttendanceData, setAttendFetchError } =
    useContext(AttendCheckContext);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const headers = {
        ...getAuthHeaders(),
        'Cache-Control': 'no-cache',
      };

      const response = await fetchData(
        `${BASE_URL}/api/v1/attendances/detail`,
        headers,
        setAttendFetchError,
      );
      if (response.code === 200) {
        setAttendanceData(response.data);
      }
    };

    fetchAttendanceData();
  }, [setAttendanceData, setAttendFetchError]);

  return null;
};

// 패널티 정보 받아오는 API
export const PenaltyAPI = () => {
  const { setMyPenalty, setPenaltyData, setPenaltyFetchError } =
    useContext(PenaltyContext);

  useEffect(() => {
    const fetchPenalty = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const headers = getAuthHeaders();
      const response = await fetchData(
        `${BASE_URL}/api/v1/penalties`,
        headers,
        setPenaltyFetchError,
      );

      const { data } = response;
      setPenaltyData(data.Penalties);
      setMyPenalty(data.penaltyCount);
    };

    fetchPenalty();
  }, [setPenaltyData, setPenaltyFetchError]);

  return null;
};
