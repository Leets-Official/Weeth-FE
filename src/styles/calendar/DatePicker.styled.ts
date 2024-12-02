import styled from 'styled-components';
import theme from '../theme';

export const DatePickerWrapper = styled.div`
  height: 86px;
  border-radius: 4px;
  background-color: ${theme.color.gray[18]};
  margin: 12px 15px 4px 15px;
  padding-top: 10px;
`;

export const DatePickerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const Icon = styled.img`
  margin: 0px 6px;
`;
