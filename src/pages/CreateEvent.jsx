import styled from 'styled-components';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';

import theme from '../styles/theme';

const StyledCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 183px;
`;

const DatePicker = styled.div`
  height: 96px;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  margin: 12px 15px 4px 15px;
`;

const StyledTextArea = styled.textarea`
  height: 504px;
  resize: none;
  padding: 15px 10px;
  margin: 12px 15px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const CreateEvent = () => {
  return (
    <StyledCreate>
      <Header title="일정 추가" text="완료" color="mainColor" />
      <InfoInput placeholder="제목" origValue="" padding="15px" />
      <DatePicker>
        <div />
      </DatePicker>
      <InfoInput text="장소" origValue="" width="75%" padding="15px" />
      <InfoInput text="준비물" origValue="" width="75%" padding="15px" />
      <InfoInput text="총인원" origValue="" width="75%" padding="15px" />
      <StyledTextArea placeholder="내용" />
    </StyledCreate>
  );
};

export default CreateEvent;
