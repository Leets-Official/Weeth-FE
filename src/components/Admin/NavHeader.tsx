import styled from 'styled-components';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
const StyledTitle = styled.div`
  font-weight: 500;
  padding: 10px;
`;

const NavHeader: React.FC = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="weeth로고" />
      <StyledTitle>WEETH ADMIN</StyledTitle>
    </StyledHeader>
  );
};

export default NavHeader;
