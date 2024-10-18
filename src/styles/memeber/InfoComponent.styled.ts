import styled from 'styled-components';
import theme from '@/styles/theme';

export const Line = styled.div`
  border: 1px solid;
  width: 325px;
  transform: scaleY(0.2);
  margin: auto;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 25px;
`;

export const Text = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
`;

export const MainColor = styled.div`
  color: ${theme.color.main.mainColor};
`;
