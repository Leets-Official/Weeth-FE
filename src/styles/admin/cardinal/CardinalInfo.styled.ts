import { styled } from 'styled-components';
import theme from '@/styles/theme';
import { BoxWrapper } from '@/components/Admin/TotalDues';
import Box from '@/components/Admin/Box';

export const CardinalBoxWrapper = styled(BoxWrapper)`
  padding: 0 0 20px 0;
  box-sizing: border-box;
  min-width: 1400px;
`;

export const TotalBox = styled(Box)`
  background-color: ${theme.color.gray[18]};
`;

export const ScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
