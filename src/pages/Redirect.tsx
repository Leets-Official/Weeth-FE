import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const Redirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      axios
        .post(
          `${BASE_URL}/api/v1/users/kakao/login`,
          { authCode: code },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          const { id, kakaoId, status, accessToken, refreshToken } =
            res.data.data;
          localStorage.setItem('id', id);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('status', status);
          localStorage.setItem('kakaoId', kakaoId);
          if (status === 'LOGIN') {
            navigate('/login');
          } else {
            navigate('/profile');
          }
        });
    }
  }, [navigate]);

  return <div />;
};

export default Redirect;
