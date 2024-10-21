import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledTitle = styled.div`
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
  padding: 10px 0px;
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

export const Detail = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`;

export const adminModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
