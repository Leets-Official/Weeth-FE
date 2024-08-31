/* eslint-disable no-unused-vars */
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
      setError('Access token is not set');
      return;
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/posts`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setBoardData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the data');
      });
  }, [accessToken, setBoardData, setError]);

  return null;
};

export default BoardAPI;
