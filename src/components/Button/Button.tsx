import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textcolor?: string;
  onClick?: () => void;
  height?: string;
  width?: string;
  borderRadius?: string;
  disabled?: boolean;
  isAttend?: boolean;
}

const BasicButton = styled.button<ButtonProps>`
  background-color: ${({ color }) => color || theme.color.gray[30]};
  font-family: ${theme.font.semiBold};
  color: ${({ textcolor }) => textcolor || theme.color.gray[100]};
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: ${({ width }) => width || 'calc(370px * 0.84)'};
  height: ${({ height }) => height || '50px'};

  &:disabled {
    color: ${theme.color.gray[65]};
    cursor: not-allowed;
  }
`;

// TODO: 스타일 props 변수 이름에 '$' 넣기
const Button: FC<ButtonProps> = ({
  children,
  color,
  textcolor,
  onClick,
  height,
  width,
  borderRadius,
  disabled,
}) => (
  <BasicButton
    color={color}
    textcolor={textcolor}
    onClick={onClick}
    height={height}
    width={width}
    borderRadius={borderRadius}
    disabled={disabled}
  >
    {children}
  </BasicButton>
);

export default Button;
