import theme from '@/styles/theme';
import styled from 'styled-components';

export const MonthlyBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 183px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.semiBold};
`;
