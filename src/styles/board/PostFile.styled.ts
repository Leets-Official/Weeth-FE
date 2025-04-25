import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 19.1875rem;
  height: 2.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.color.gray[30]};
  background-color: ${theme.color.gray[18]};
  border-radius: 0.3125rem;
  padding: 0 0.5rem;
  margin-bottom: 0.625rem;
`;

export const FolderIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

export const FileName = styled.div`
  font-size: 0.875rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;
