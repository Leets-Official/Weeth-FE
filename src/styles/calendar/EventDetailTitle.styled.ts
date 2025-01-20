import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventTitleWrapper = styled.div``;

export const Title = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  padding: 10px 15px;
`;

export const Writer = styled.div`
  font-family: ${theme.font.regular};
  font-size: 12px;
  color: #a6a6a6;
`;

export const WrittenTime = styled.div`
  font-family: ${theme.font.regular};
  font-size: 12px;
  color: #a6a6a6;
`;

export const WriteInfo = styled.div`
  display: flex;
  padding: 0 15px;
  div {
    margin-right: 10px;
  }
`;

export const adminModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
