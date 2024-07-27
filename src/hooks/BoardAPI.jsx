import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BoardContext } from './BoardContext';
import { id } from 'date-fns/locale';

const BoardAPI = () => {
  const { setBoardData, setError } = useContext(BoardContext);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {

    axios
      .get('http://13.125.78.31:8080/board')
      .then((response) => {
        if (response.data.code === 200) {

          console.log(boardData);

          console.log('API Response Data:', response.data.data); // 데이터 확인용
          setMonthEventData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      });


axios
  .get(`http://13.125.78.31:8080/board`)
  .then((response) => {
  if (response.data.code === 200) {
    console.log(boardData);
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

    }, [ACCESS_TOKEN, setBoardData, setError]);

  return null;
};

export default BoardAPI;