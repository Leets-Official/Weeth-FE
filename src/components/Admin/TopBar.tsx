import React from 'react';
import styled from 'styled-components';

const TopBarWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #dedede;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 24px;
`;
const Description = styled.p`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 400;
`;

interface TopBarProps {
  title: string;
  description: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, description }) => {
  return (
    <TopBarWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TopBarWrapper>
  );
};

export default TopBar;
