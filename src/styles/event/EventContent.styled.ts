import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Title = styled.div`
  padding-top: 15px;
  font-family: ${theme.font.semiBold};
`;

export const AttendanceCode = styled.div`
  padding-bottom: 20px;
  color: ${theme.color.main};
  font-size: 48px;
  font-family: ${theme.font.semiBold};
`;

export const ContentBlock = styled.div`
  width: 88%;
  background-color: ${theme.color.gray[18]};
  padding: 15px;
  border-radius: 10px;
  white-space: pre-wrap;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EndTime = styled.div`
  padding-left: 25px;
`;
