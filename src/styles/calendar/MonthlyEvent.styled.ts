import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grayScale.gray18};
  padding: 10px;
  margin-bottom: 15px;
  width: 143px; //사이즈 수정 필요
  border-radius: 10px;
  font-size: 14px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

export const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

export const MonthName = styled.div<{ $isToday: boolean }>`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.$isToday === true ? '#00dda8' : '#ffffff')};
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;
