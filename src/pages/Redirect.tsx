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
          console.log('res in redirect', res);
          const { kakaoId, status, accessToken, refreshToken } = res.data.data;
          localStorage.setItem('kakaoId', kakaoId);
          if (res.data.code === 200) {
            console.log('code', res.data.code);
            if (status === 'LOGIN') {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              navigate('/home');
            } else {
              navigate('/accountcheck');
            }
          } else if (res.data.code === 403) {
            navigate('/waiting-approval');
          }
        })
        .catch((err: unknown) => {
          if (axios.isAxiosError(err) && err.response) {
            if ((err.response.data as { code: number }).code === 403) {
              navigate('/waiting-approval');
            } else {
              navigate('/');
            }
          } else {
            alert('서버로부터 응답을 받지 못했습니다.');
          }
        });
    }
  }, [navigate]);

  return <div />;
};

export default Redirect;
