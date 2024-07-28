import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { EventContext } from './EventContext';

const EventAPI = ({ start, end, year }) => {
  const { setMonthEventData, setError, setYearEventData } = useContext(EventContext);

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
          console.log('API Response Data(달):', response.data.data); // 데이터 확인용
          setMonthEventData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      });

      if (year) {
        axios
          .get(`http://13.125.78.31:8080/event/year`, { headers, params: { year: year } })
          .then((response) => {
            console.log(`year: ${year}`);

            if (response.data.code === 200) {
              console.log('API response Data(년):', response.data.data); // 데이터 확인용
              setYearEventData(response.data.data);
            } else {
              setError(response.data.message);
            }
          })
          .catch((err) => {
            console.error('API Request Error:', err); // 에러 로그
            setError('데이터를 가져오는 중 오류가 발생했습니다');
          });
      }
    }, [ACCESS_TOKEN, setMonthEventData, setError, setYearEventData, start, end, year]);
  
  return null;
};

EventAPI.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default EventAPI;
