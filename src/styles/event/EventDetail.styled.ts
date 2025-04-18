import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventDetailWrapper = styled.div`
  width: 370px;
  margin-bottom: 50px;
`;

export const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.gray[30]};
  margin: 15px;
  transform: scaleY(0.2);
  width: 88%;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.semiBold};
`;
