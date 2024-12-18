import React from 'react';
import styled from 'styled-components';

const TopBarWrapper = styled.div`
  height: 78px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 1.1rem;
`;

interface TopBarProps {
  title?: string;
}
const TopBar: React.FC<TopBarProps> = ({ title = 'TopBar' }) => {
  return <TopBarWrapper>{title}</TopBarWrapper>;
};

export default TopBar;
