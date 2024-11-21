import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventTitleWrapper = styled.div``;

export const Title = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
  padding: 10px 25px;
`;

export const Writer = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

export const WrittenTime = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

export const WriteInfo = styled.div`
  display: flex;
  padding: 0 25px;
  div {
    margin-right: 10px;
  }
`;

export const adminModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
