import React, { useEffect, useContext } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { NoticeContext } from './NoticeContext';

const NoticeAPI = () => {
  const { setNoticeData, setError } = useContext(NoticeContext);

  // const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is not set');
      setError('Access token is not set');
      return;
    }

    console.log("Access Token:", accessToken);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}`, { headers })
      .then((response) => {
        console.log('Raw Response:', response); // 전체 응답 데이터 확인
        if (response.data.code === 200) {
          console.log('API Response Data:', response.data.data); // 데이터 확인용
          setNoticeData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      });
  }, [ACCESS_TOKEN, setNoticeData, setError]);

  return null;
};

export default NoticeAPI;
