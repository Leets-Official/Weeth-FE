import theme from '@/styles/theme';
import styled from 'styled-components';

export const Cardinal = styled.div`
  display: flex;
  padding-top: 20px;
  overflow-x: auto;
  white-space: nowrap;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

export const ScrollContainer = styled.div`
  display: flex;
  width: 94%;
  overflow-x: auto;
  cursor: grab;
  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
  }
`;

export const Button = styled.button<{ $isSelected: boolean }>`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 62px;
  flex-shrink: 0;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.$isSelected ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;
