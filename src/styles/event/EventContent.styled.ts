import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ContentBlock = styled.div`
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
