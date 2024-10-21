import theme from '@/styles/theme';
import styled from 'styled-components';

export const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 370px;
  padding-bottom: 183px;
`;

export const FirstHalfMonth = styled.div`
  padding-left: 15px;
`;

export const SecondHalfMonth = styled.div`
  padding-right: 15px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;
