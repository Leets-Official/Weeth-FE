import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 307px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.color.gray[30]};
  background-color: ${theme.color.gray[18]};
  border-radius: 5px;
  padding: 0 8px;
  margin-bottom: 10px;
`;

export const FolderIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const FileName = styled.div`
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
`;
