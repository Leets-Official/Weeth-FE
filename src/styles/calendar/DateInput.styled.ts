/* eslint-disable import/prefer-default-export */
import theme from '@/styles/theme';
import styled from 'styled-components';

export const Input = styled.input<{
  $height: string;
  $width: string;
  $margin: string;
}>`
  height: ${(props) => props.$height || '0px'};
  width: ${(props) => props.$width || '0px'};
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.gray[12]};
  color: white;
  text-align: center;
  margin-left: ${(props) => props.$margin || '0px'};
  margin-right: ${(props) => props.$margin || '0px'};
  padding: 0px;
  font-size: 16px;
  font-family: ${theme.font.regular};

  /* Custom CSS to remove arrows in number input */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
`;
