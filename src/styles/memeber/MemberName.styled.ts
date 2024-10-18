import styled from 'styled-components';
import theme from '@/styles/theme';

export const MemberWrapper = styled.div`
  padding: 20px 10px 0px 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  background-color: ${theme.color.grayScale.gray18};

  &:first-of-type {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

export const MemberContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30};
  width: 325px;
  margin: auto;
  margin-top: 10px;
  transform: scaleY(0.2);
`;

export const Caption = styled.div`
  font-size: 12px;
`;

export const TextWrapper = styled.div`
  margin-left: 10px;
`;
