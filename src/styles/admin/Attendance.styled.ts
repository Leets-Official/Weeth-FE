import styled from 'styled-components';
import theme from '../theme';

export const AttendanceTable = styled.div`
  width: 815px;
  background-color: #f2f9f8;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid #dedede;

  &:last-child {
    margin-bottom: 15px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 25px 25px;
  display: flex;
  justify-content: space-between;
`;

export const DateInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DateText = styled.span`
  font-family: ${theme.font.regular};
  font-size: 20px;
  color: black;
  margin-right: 15px;
`;

export const ContentText = styled.span`
  font-family: ${theme.font.regular};
  font-size: 20px;
  color: black;
`;

export const Button = styled.div``;
