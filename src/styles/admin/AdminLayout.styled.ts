import styled from 'styled-components';
import theme from '@/styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  font-family: ${theme.font.regular};
  color: #000000;
  background-color: #f2f9f8;
  display: flex;
  overflow-x: auto;
`;

export const Container = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  margin: 20px 30px 0 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100vh;
  width: calc(100vw - 250px);
  overflow-y: auto;
`;
