import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledDues = styled.div`
  width: 370px;
  height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;

export const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

export const DuesListBox = styled.div`
  width: 92%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 4%;
  background-color: ${theme.color.grayScale.gray18};
`;

export const DuesList = styled.div`
  width: 92%;
  margin: 0px 10px 0 10px;
`;

export const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 325px;
  margin-top: 20px;
  transform: scaleY(0.2);
`;

export const MoneyBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 35px;
`;

export const MoneyBox = styled.div`
  font-size: 25px;
  font-family: ${theme.font.family.pretendard_semiBold};
  margin-left: 15px;
  align-items: start;
`;