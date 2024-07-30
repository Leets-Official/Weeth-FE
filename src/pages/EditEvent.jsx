import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
  width: 370px;
  padding-bottom: 183px;
`;

const DatePickerWrapper = styled.div`
  height: 86px;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  margin: 12px 15px 4px 15px;
  padding-top: 10px;
`;

const StyledPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
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

const DatePicker = ({ status, dateTime }) => {
  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={dateTime[0]}
        width="58px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      년
      <DateInput
        value={dateTime[1]}
        width="37px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      월
      <DateInput
        value={dateTime[2]}
        width="37px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      일
      <DateInput
        value={dateTime[3]}
        width="37px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
      :
      <DateInput
        value={dateTime[4]}
        width="37px"
        height="28px"
        margin="5px"
        editValue={() => {}}
      />
    </StyledPicker>
  );
};

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://13.125.78.31:8080/event/${id}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          },
        );
        console.log(id);

        if (response.data.code === 200) {
          setEvent(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch event data');
      }
    };

    fetchEventData();
  }, [id, ACCESS_TOKEN]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  const splittedStartDate = event.start.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const startDate = splittedStartDate[0].split('-'); // [YYYY, MM, DD]
  const startTime = splittedStartDate[1].split(':'); // [HH, MM]
  const startDateTime = startDate.concat(startTime);

  const splittedEndDate = event.end.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const endDate = splittedEndDate[0].split('-'); // [YYYY, MM, DD]
  const endTime = splittedEndDate[1].split(':'); // [HH, MM]
  const endDateTime = endDate.concat(endTime);

  return (
    <StyledCreate>
      <Header title="일정 수정" text="완료" color="mainColor" />
      <InfoInput
        placeholder="제목"
        origValue={event.title || ''}
        padding="15px"
        align="left"
        editValue={() => {}}
      />
      <DatePickerWrapper>
        <DatePicker status="start" dateTime={startDateTime} />
        <DatePicker status="end" dateTime={endDateTime} />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue={event.location || ''}
        width="75%"
        padding="15px"
        align="left"
        editValue={() => {}}
      />
      <InfoInput
        text="준비물"
        origValue={event.supplies || ''}
        width="75%"
        padding="15px"
        align="left"
        editValue={() => {}}
      />
      <InfoInput
        text="총인원"
        origValue={event.totalParticipants || ''}
        width="75%"
        padding="15px"
        align="left"
        editValue={() => {}}
      />
      <StyledTextArea
        placeholder="내용"
        defaultValue={event.description || ''}
      />
    </StyledCreate>
  );
};

DatePicker.propTypes = {
  status: PropTypes.string.isRequired,
  dateTime: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditEvent;
