import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

// 타입 정의
interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textcolor?: string;
  onClick?: () => void;
  height?: string;
  width?: string;
  disabled?: boolean;
}


const BasicButton = styled.button<ButtonProps>`
  background-color: ${({ color }) => color || theme.color.grayScale.gray30};
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${({ textcolor }) => textcolor || theme.color.grayScale.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: ${({ width }) => width || 'calc(370px * 0.84)'};
  height: ${({ height }) => height || '50px'};
`;

// function 컴포넌트
const Button: FC<ButtonProps> = ({ children, color, textcolor, onClick, height, width, disabled}) => (
  <BasicButton color={color} textcolor={textcolor} onClick={onClick} height={height} width={width}  disabled={disabled}>
    {children}
  </BasicButton>
);

export default Button;
