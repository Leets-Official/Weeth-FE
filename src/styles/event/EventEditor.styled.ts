import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 370px;
  gap: 23px;
  padding-bottom: 40px;
  font-family: ${theme.font.regular};
`;

export const Bold = styled.div`
  display: flex;
  margin-right: auto;
  padding-top: 15px;
  font-family: ${theme.font.semiBold};
  font-size: 16px;
`;

export const Description = styled.div`
  color: ${theme.color.gray[65]};
`;

export const Align = styled.div`
  display: flex;
  gap: 12px;
`;

export const Help = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.color.gray[30]};
  cursor: pointer;
`;

export const Meeting = styled.div`
  width: 360px;
  height: 50px;
  padding: 0 20px 0 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StartDate = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 12px 0 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const Cardinal = styled.div`
  display: flex;
  gap: 10px;
  padding: 13px 10px;
  margin-left: auto;
`;

export const CardinalList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 238px;
  gap: 5px;
  box-sizing: border-box;
`;

export const TimeBlock = styled.div`
  background-color: ${theme.color.gray[12]};
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const Line = styled.div`
  width: 360px;
  border: 1px solid ${theme.color.gray[30]};
`;

export const TextAreaWrapper = styled.div`
  width: 360px;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
`;

export const TextArea = styled.textarea`
  height: 200px;
  width: 325px;
  margin: 15px 10px;
  padding-right: 10px;
  resize: none;
  border: none;
  outline: none;
  background-color: ${theme.color.gray[18]};
  color: white;
  font-family: ${theme.font.regular};
  font-size: 16px;

  &::placeholder {
    color: ${theme.color.gray[65]};
    font-family: ${theme.font.regular};
  }

  &::-webkit-scrollbar {
    width: 5px;
    margin: 15px 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.regular};
`;
