import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 183px;
  font-family: ${theme.font.family.pretendard_regular};
`;

export const TextAreaWrapper = styled.div`
  margin: 12px 10px;
  width: 344px;
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  height: 504px;
  width: 310px;
  margin: 15px 10px;
  padding-right: 10px;
  resize: none;
  border: none;
  outline: none;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;

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
  font-family: ${theme.font.family.pretendard_regular};
`;
