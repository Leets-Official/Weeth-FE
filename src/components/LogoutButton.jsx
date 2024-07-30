import React from 'react';
import styled from 'styled-components';

import logout from '../assets/images/ic_logout_gray.svg';
import handleLogout from '../utils/handleLogout';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const LogoutButton = () => {
  return (
    <ImgButton onClick={handleLogout}>
      <img src={logout} alt="logout" />
    </ImgButton>
  );
};

export default LogoutButton;
