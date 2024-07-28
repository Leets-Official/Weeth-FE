import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';

import theme from '../styles/theme';

import icCalendar from '../assets/images/ic_date.svg';
import icWave from '../assets/images/ic_wave.svg';
import DateInput from '../components/Calendar/DateInput';

const StyledCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 375px;
  padding-bottom: 183px;
`;

const DatePickerWrapper = styled.div`
  height: 96px;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  margin: 12px 15px 4px 15px;
`;

const StyledPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 15px 6px;
`;

const WaveImg = styled.img`
  margin: 0px 6px;
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

const getValue = (status) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();

  const valueArr = [year, month, day, hour, minute];

  if (status === 'start') return valueArr;
  return [];
};

const DatePicker = ({ status }) => {
  const now = getValue(status);

  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={now[0]}
        width="59px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      년
      <DateInput
        value={now[1]}
        width="39px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      월
      <DateInput
        value={now[2]}
        width="39px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      일
      <DateInput
        value={now[3]}
        width="39px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      :
      <DateInput
        value={now[4]}
        width="39px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
    </StyledPicker>
  );
};

const CreateEvent = () => {
  return (
    <StyledCreate>
      <Header title="일정 추가" text="완료" color="mainColor" />
      <InfoInput
        placeholder="제목"
        origValue=""
        padding="15px"
        editValue={() => {}}
      />
      <DatePickerWrapper>
        <DatePicker status="start" />
        <DatePicker status="end" />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue=""
        width="75%"
        padding="15px"
        editValue={() => {}}
      />
      <InfoInput
        text="준비물"
        origValue=""
        width="75%"
        padding="15px"
        editValue={() => {}}
      />
      <InfoInput
        text="총인원"
        origValue=""
        width="75%"
        padding="15px"
        editValue={() => {}}
      />
      <StyledTextArea placeholder="내용" />
    </StyledCreate>
  );
};

DatePicker.propTypes = {
  status: PropTypes.number.isRequired,
};

export default CreateEvent;
