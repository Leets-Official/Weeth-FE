import styled from 'styled-components';

import Logout from '@/assets/images/ic_logout_gray.svg';
import useLogout from '@/hooks/useLogout';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 5%;
`;

const LogoutButton: React.FC = () => {
  const logout = useLogout();

  return (
    <ImgButton onClick={logout}>
      <img src={Logout} alt="logout" />
    </ImgButton>
  );
};

export default LogoutButton;
