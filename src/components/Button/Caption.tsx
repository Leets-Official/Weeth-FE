import theme from '@/styles/theme';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

// 배경색이랑 글자색 props로 전달 받아 설정 가능
// props 전달 없으면 gray30에 흰색 글씨로 기본형 버튼

interface CaptionProps {
  color?: string;
  textcolor?: string;
  children: ReactNode;
}

const BasicCaption = styled.button<{ color?: string; $textcolor?: string }>`
  width: 47px;
  height: 19px;
  background-color: ${({ color }) => color || theme.color.gray[30]};
  font-family: ${theme.font.semiBold};
  color: ${({ $textcolor }) => $textcolor || theme.color.gray[100]};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption: React.FC<CaptionProps> = ({ children, color, textcolor }) => (
  <BasicCaption color={color} $textcolor={textcolor}>
    {children}
  </BasicCaption>
);

export default Caption;
