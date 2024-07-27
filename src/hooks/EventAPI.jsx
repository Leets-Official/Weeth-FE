import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { EventContext } from './EventContext';

const EventAPI = ({ start, end }) => {
  const { setEventData, setError } = useContext(EventContext);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    if (!start || !end) return;
    
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
    const params = {
      start: start,
      end: end,
    };
    console.log(`start: ${start}`); // 시간 확인용
    console.log(`end: ${end}`);

    axios
      .get('http://13.125.78.31:8080/event', { headers, params })
      .then((response) => {
        if (response.data.code === 200) {
          console.log('API Response Data:', response.data.data); // 데이터 확인용
          setEventData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      });

  }, [ACCESS_TOKEN, setEventData, setError, start, end]);

  return null;
};

EventAPI.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default EventAPI;
