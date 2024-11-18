import styled from 'styled-components';

import logout from '@/assets/images/ic_logout_gray.svg';
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
  const confirmLogout = () => {
    useLogout();
  };

  return (
    <ImgButton onClick={confirmLogout}>
      <img src={logout} alt="logout" />
    </ImgButton>
  );
};

export default LogoutButton;