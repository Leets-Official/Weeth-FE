/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { NoticeContext } from './NoticeContext';

const NoticeAPI = () => {
  const { setNoticeData, setError } = useContext(NoticeContext);

  // const ACCESS_TOKEN = import.meta.env.REACT_APP_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!accessToken) {
      setError('Access token is not set');
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setNoticeData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the data');
      });
  }, [accessToken, setNoticeData, setError]);

  return null;
};

export default NoticeAPI;
