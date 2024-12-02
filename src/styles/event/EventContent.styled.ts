import theme from '@/styles/theme';
import styled from 'styled-components';

export const ContentBlock = styled.div`
  background-color: ${theme.color.gray[18]};
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  white-space: pre-wrap;
`;

export const TimeInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  padding-right: 5px;
`;

export const EndTime = styled.div`
  padding-left: 25px;
`;
