import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MonthlyScheduleContext } from './MonthlyScheduleContext';
import Utils from './Utils';

const MonthlyScheduleAPI = ({ start, end }) => {
  const { setMonthScheduleData, setError } = useContext(MonthlyScheduleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!start || !end) return;

    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      };
      const params = {
        start,
        end,
      };

      try {
        let response = await axios.get(`${BASE_URL}/api/v1/schedules/monthly`, {
          headers,
          params,
        });

        // Utils 함수를 사용하여 응답 처리 및 토큰 갱신
        response = await Utils(
          response,
          axios.get,
          [{ url: `${BASE_URL}/api/v1/schedules/monthly`, headers, params }],
          navigate,
        );

        if (response.data.code === 200) {
          console.log('API Response Data(달):', response.data.data); // 데이터 확인용
          setMonthScheduleData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [navigate, setMonthScheduleData, setError, start, end]);

  return null;
};

MonthlyScheduleAPI.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

MonthlyScheduleAPI.defaultProps = {
  start: '',
  end: '',
};

export default MonthlyScheduleAPI;
