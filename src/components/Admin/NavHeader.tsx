import styled from 'styled-components';
import logo from '../../../public/logo/original.svg';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 20px 15px;
  gap: 10px;
`;

const StyledLogo = styled.img`
  width: 40px;
  height: auto;
`;
const StyledTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
`;

const NavHeader: React.FC = () => {
  return (
    <StyledHeader>
      <StyledLogo src={logo} alt="weeth로고" />
      <StyledTitle>WEETH ADMIN</StyledTitle>
    </StyledHeader>
  );
};

export default NavHeader;
