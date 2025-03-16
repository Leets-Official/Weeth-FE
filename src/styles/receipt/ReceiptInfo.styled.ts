import styled from 'styled-components';

export const MemberWrapper = styled.div`
  width; 88%;
  margin: 16px 6% 0 6%;
`;

export const StyledReceiptBox = styled.div`
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
  margin-left: 10px;
`;

export const Text = styled.div<{ $isLong: boolean }>`
  font-size: 16px;
  word-wrap: break-word;
  ${({ $isLong }) => $isLong && `max-width: 80%;`}
`;

export const MoneyText = styled.div`
  font-size: 16px;
  white-space: nowrap;
`;

export const SmallText = styled.div`
  margin-top: 7px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
