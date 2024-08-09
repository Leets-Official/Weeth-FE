import { useEffect, useContext } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { BoardContext } from './BoardContext';

const BoardAPI = () => {
  const { setBoardData, setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is not set');
      setError('Access token is not set');
      return;
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}/posts`, { headers })
      .then((response) => {
        console.log('Raw Response:', response); // 전체 응답 데이터 확인
        if (response.data.code === 200) {
          console.log('API Response Data:', response.data.data); // 데이터 확인용
          setBoardData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      });
  }, [accessToken, setBoardData, setError]);

  return null;
};

export default BoardAPI;
