import { useContext, useEffect } from 'react';
import Utils from '@/hooks/Utils';
import api from './api';
import { UserContext } from './UserContext';

const UserAPI = () => {
  const { setUserData, setError } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const originalApiFuncUser = () => api.get(`/api/v1/users`);

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
  }, [setUserData, setError]);

  return null;
};

export default UserAPI;
