import { useNavigate } from 'react-router-dom';

/*
const confirmLogout = handleLogout();
이거 선언하고 onClick에 confirmLogout 넣으면 됩니당

이러면 로그아웃 하냐 물어보고 ㅇㅋ 하면 로그아웃
*/

const handleLogout = () => {
  const navigate = useNavigate();

  const confirmLogout = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    }
  };

  return confirmLogout;
};

export default handleLogout;
