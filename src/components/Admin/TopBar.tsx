import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import useLogout from '@/hooks/useLogout';

export const TopBarWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #dedede;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

export const Description = styled.p`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 400;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
interface TopBarProps {
  title: string;
  description: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, description }) => {
  const logout = useLogout();

  return (
    <TopBarWrapper>
      <TitleContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleContainer>
      <Button
        color="#2f2f2f"
        textcolor="#fff"
        height="45px"
        width="85px"
        borderRadius="4px"
        isSemibold={false}
        onClick={logout}
      >
        Logout
      </Button>
    </TopBarWrapper>
  );
};

export default TopBar;
