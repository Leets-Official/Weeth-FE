import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import Utils from './Utils'; // Utils 함수 임포트

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

    const fetchUserData = async () => {
      try {
        // 내 정보 조회 API 호출 함수
        const originalApiFuncUser = () =>
          axios.get(`${BASE_URL}/api/v1/users`, { headers });

        // Utils 함수로 처리
        const userResponse = await Utils(
          await originalApiFuncUser(),
          originalApiFuncUser,
          [],
        );

        if (userResponse.data.code === 200) {
          setUserData(userResponse.data.data);
        } else {
          setError(userResponse.data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the data');
      }
    };

    const fetchAllUsersData = async () => {
      try {
        // 모든 멤버 조회 API 호출 함수
        const originalApiFuncAllUsers = () =>
          axios.get(`${BASE_URL}/api/v1/users/all`, { headers });

        // Utils 함수로 처리
        const allUsersResponse = await Utils(
          await originalApiFuncAllUsers(),
          originalApiFuncAllUsers,
          [],
        );

        if (allUsersResponse.data.code === 200) {
          setAllUserData(allUsersResponse.data.data);
        } else {
          setError(allUsersResponse.data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the all users data');
      }
    };

    // 내 정보 조회 및 모든 멤버 조회 비동기 함수 호출
    fetchUserData();
    fetchAllUsersData();

  }, [accessToken, setUserData, setError, setAllUserData, BASE_URL]);

  return null;
};

export default UserAPI;
