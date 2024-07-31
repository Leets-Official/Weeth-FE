import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { EventContext } from './EventContext';
import Utils from '../hooks/Utils';
import { useNavigate } from 'react-router-dom';

const EventAPI = ({ start, end }) => {
  const { setMonthEventData, setError } = useContext(EventContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!start || !end) return;

    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const params = {
        start: start,
        end: end,
      };

      try {
        let response = await axios.get('http://13.125.78.31:8080/event', { headers, params });

        // Utils 함수를 사용하여 응답 처리 및 토큰 갱신
        response = await Utils(response, axios.get, [{ url: 'http://13.125.78.31:8080/event', headers, params }], navigate);

        if (response.data.code === 200) {
          console.log('API Response Data(달):', response.data.data); // 데이터 확인용
          setMonthEventData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [navigate, setMonthEventData, setError, start, end]);

  return null;
};

EventAPI.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

export default EventAPI;
