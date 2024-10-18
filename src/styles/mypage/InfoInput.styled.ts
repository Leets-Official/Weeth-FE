import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledInfoInput = styled.div<{ $padding: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: ${(props) => props.$padding || '0px'};
  padding-right: ${(props) => props.$padding || '0px'};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

export const Input = styled.input<{
  width?: string;
  $edit?: boolean;
  align?: string;
}>`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: ${(props) => (props.$edit ? theme.color.grayScale.gray30 : 'white')};
  text-align: ${(props) => props.align || 'right'};
  padding-left: 10px;
  padding-right: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;

  &::placeholder {
    font-family: ${theme.font.family.pretendard_regular};
  }
`;

export const PwInput = styled.input<{ width?: string; align?: string }>`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  padding-left: 10px;
  padding-right: 43px;
  text-align: ${(props) => props.align || 'right'};
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_regular};

  &::placeholder {
    font-family: ${theme.font.family.pretendard_regular};
  }
`;

export const Visible = styled.img`
  position: absolute;
  right: 35px;
  cursor: pointer;
`;
