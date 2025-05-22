import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { toastError } from '@/components/common/ToastMessage';

const Redirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const redirectPath = queryParams.get('state') || '/home';

    if (code) {
      api
        .post(`/api/v1/users/kakao/login`, { authCode: code })
        .then((res) => {
          const { kakaoId, status, accessToken, refreshToken } = res.data.data;
          localStorage.setItem('kakaoId', kakaoId);
          if (res.data.code === 200) {
            if (status === 'LOGIN') {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              navigate(redirectPath, { replace: true });
            } else {
              navigate('/accountcheck');
            }
          } else if (res.data.code === 403) {
            navigate('/waiting-approval');
          }
        })
        .catch((err: any) => {
          if ((err.response.data as { code: number }).code === 403) {
            navigate('/waiting-approval');
          } else {
            toastError('로그인에 실패했습니다.');
            navigate('/');
          }
        });
    }
  }, [navigate]);

  return <div />;
};

export default Redirect;
