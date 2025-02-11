import theme from '@/styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 14px;
  font-family: ${theme.font.regular};
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  margin-left: 10px;
`;

export const Title = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 18px;
`;

export const Caption = styled.div`
  display: flex;
  gap: 5px;
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;
