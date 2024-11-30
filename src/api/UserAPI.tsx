import Utils from '@/hooks/Utils';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

const UserAPI = () => {
  const { setUserData, setError } = useContext(UserContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };

    const fetchUserData = async () => {
      try {
        const originalApiFuncUser = () =>
          axios.get(`${BASE_URL}/api/v1/users`, { headers });

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
      } catch (err: any) {
        // 에러 객체에서 안전하게 response와 message 추출
        const errorResponse = err.response;
        const errorMessage =
          errorResponse?.data?.message || 'An error occurred';

        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          setError(errorMessage);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, [accessToken, setUserData, setError, BASE_URL]);

  return null;
};

export default UserAPI;
