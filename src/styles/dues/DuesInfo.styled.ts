import theme from '@/styles/theme';
import styled from 'styled-components';

export const DuesWrapper = styled.div`
  width; 100%;
  padding: 20px 0px 0px 0px;
  font-family: ${theme.font.regular};
`;

export const StyledDuesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCaptionBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -2px;
`;

export const StyledMemoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: end;
  margin-left: 10px;
`;

export const Text = styled.div`
  font-size: 16px;
`;

export const SmallText = styled.div`
  margin-top: 7px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

export const SmallTextMemo = styled.div`
  width: 100px;
  margin-top: 7px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
