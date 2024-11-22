// 게시판 리팩토링 후 삭제 예정
import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  text: string;
}

const StyledText = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Title: React.FC<TitleProps> = ({ text }) => {
  return <StyledText>{text}</StyledText>;
};

export default Title;
