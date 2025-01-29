import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventTitleWrapper = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  padding-bottom: 10px;
`;

export const Writer = styled.div`
  font-family: ${theme.font.regular};
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

export const WrittenTime = styled.div`
  font-family: ${theme.font.regular};
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

export const WriteInfo = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
`;

export const Cardinal = styled.div`
  font-family: ${theme.font.regular};
  font-size: 12px;
  color: ${theme.color.gray[65]};
  padding-right: 5px;
`;

export const adminModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
