import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledContent = styled.div<{ $isMonth: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$isMonth ? '275px' : '121px')};
  height: 38px;
  background: ${theme.color.grayScale.gray18};
  border-radius: 14px;
  padding: 20px;
  margin: auto;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

export const YearButton = styled.div`
  position: fixed;
  width: 370px;
  transform: translate(320px, -80px);
`;

export const MonthButton = styled.div`
  position: fixed;
  width: 370px;
  transform: translate(320px, -80px);
`;

export const Text = styled.div`
  margin-right: 15px;
`;
