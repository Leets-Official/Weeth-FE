import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const UserAPI = () => {
  const { setUserData, setError, setAllUserData } = useContext(UserContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };

    // 내 정보 조회
    axios
      .get(`${BASE_URL}/api/v1/users`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setUserData(response.data.data);
        } else {
          setError(response.data.message);
        }
        // console.log('유저 api 받아옴!', response.data.data);
      })
      .catch((err) => {
        setError('An error occurred while fetching the data');
      });

      // 모든 멤버 조회
      axios.get(`${BASE_URL}/api/v1/users/all`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setAllUserData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the all users data');
      });

  }, [accessToken, setUserData, setError, setAllUserData]);

  return null;
};

export default UserAPI;
