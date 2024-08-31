import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AttendContext } from './AttendContext';

const AttendAPI = () => {
  const { setAttendanceData, setAttendFetchError, setHasSchedule } =
    useContext(AttendContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        // const ACCESS_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        };

        const response = await axios.get(`${BASE_URL}/api/v1/attendances`, {
          headers,
        });

        const { data } = response.data;
        setAttendanceData(data);
        // eslint-disable-next-line no-console
        // console.log(data);

        if (data.title != null && data.start != null) {
          setHasSchedule(true);
        }
      } catch (err) {
        setAttendFetchError(err.message);
      }
    };

    fetchAttendances();
  }, [accessToken, refreshToken]);

  return null;
};

export default AttendAPI;
