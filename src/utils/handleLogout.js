import { useNavigate } from 'react-router-dom';

const handleLogout = () => {
  const navigate = useNavigate();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  navigate('/login');
};

export default handleLogout;
