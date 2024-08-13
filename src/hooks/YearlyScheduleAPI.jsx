import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { YearlyScheduleContext } from './YearlyScheduleContext';
import Utils from './Utils';

const YearlyScheduleAPI = ({ start, end }) => {
  const { setYearScheduleData, setError } = useContext(YearlyScheduleContext);
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
        let response = await axios.get(`${BASE_URL}/api/v1/schedules/yearly`, {
          headers,
          params,
        });
        console.log('util상관없이 받아온거');
        // Utils 함수를 사용하여 응답 처리 및 토큰 갱신
        response = await Utils(
          response,
          axios.get,
          [{ url: `${BASE_URL}/api/v1/schedules/yearly`, headers, params }],
          navigate,
        );

        if (response.data.code === 200) {
          console.log('모든 게 성공햇을 때.. 서버 응답', response.data.data); // 데이터 확인용
          setYearScheduleData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('에러', err); // 에러 로그
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

YearlyScheduleAPI.defaultProps = {
  start: '',
  end: '',
};

export default YearlyScheduleAPI;