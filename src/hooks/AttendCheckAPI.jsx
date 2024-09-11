import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AttendCheckContext } from './AttendCheckContext';

const AttendCheckAPI = () => {
  const { setAttendanceData, setAttendFetchError } =
    useContext(AttendCheckContext);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(
          `${BASE_URL}/api/v1/attendances/detail`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Authorization_refresh: `Bearer ${refreshToken}`,
              'Cache-Control': 'no-cache',
            },
          },
        );
        const result = response.data;
        setAttendanceData(result.data);
        // console.log(result);
        if (result.code === 200) {
          setAttendanceData(result.data);
          // console.log(result);
        } else {
          // console.error('Failed to get data:', result.message);
        }
      } catch (error) {
        // console.error('Error fetching attendance data:', error);
        // console.error('Error details:', error.response);
        setAttendFetchError(error.message);
      }
    };

    fetchAttendanceData();
  }, [accessToken, refreshToken, setAttendanceData]);

  return null;
};

export default AttendCheckAPI;
