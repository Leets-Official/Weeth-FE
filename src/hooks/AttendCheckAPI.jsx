import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AttendCheckContext } from './AttendCheckContext';

const AttendCheckAPI = () => {
  const { setAttendanceData, setAttendFetchError } =
    useContext(AttendCheckContext);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/api/v1/attendances`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
        });
        setAttendanceData(response.data.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setAttendFetchError(error.message); // 에러 메시지 저장
      }
    };

    fetchAttendanceData();
  }, [accessToken]); // accessToken이 변경될 때마다 API를 다시 호출

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('accessToken');
      if (newToken !== accessToken) {
        setAccessToken(newToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [accessToken]);

  return null;
};

export default AttendCheckAPI;
