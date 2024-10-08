/* eslint-disable react/require-default-props */
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { YearlyScheduleContext } from './YearlyScheduleContext';

const YearlyScheduleAPI = ({ start, end }) => {
  const { setYearScheduleData, setError } = useContext(YearlyScheduleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!start || !end) return;

    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const BASE_URL = import.meta.env.VITE_API_URL;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      };
      const params = {
        start,
        end,
      };

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/schedules/yearly`,
          {
            headers,
            params,
          },
        );

        if (response.data.code === 200) {
          setYearScheduleData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        // console.error('에러', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [navigate, setYearScheduleData, setError, start, end]);

  return null;
};

YearlyScheduleAPI.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

export default YearlyScheduleAPI;
