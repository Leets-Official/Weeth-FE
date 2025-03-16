import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledDues = styled.div`
  width: 370px;
`;

export const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

export const DuesListBox = styled.div`
  width: 92%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  margin: 0 4% 50px 4%;
  padding-bottom: 15px;
  background-color: ${theme.color.gray[18]};
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
  font-family: ${theme.font.semiBold};
  margin-left: 15px;
  align-items: start;
`;

export const NullText = styled.div`
  font-size: 25px;
  font-family: ${theme.font.semiBold};
  margin-top: 20px;
  justify-content: center;
  text-align: center;
`;
