import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import theme from '../styles/theme';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';
import icCalendar from '../assets/images/ic_date.svg';
import icWave from '../assets/images/ic_wave.svg';
import DateInput from '../components/Calendar/DateInput';
import { EventInfoContext } from '../hooks/EventInfoContext';

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

// 날짜 선택기 컴포넌트
const DatePicker = ({ status, onDateChange }) => {
  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value=""
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, value)}
        inputType="year"
      />
      년
      <DateInput
        value=""
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, value)}
        inputType="month"
      />
      월
      <DateInput
        value=""
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, value)}
        inputType="day"
      />
      일
      <DateInput
        value=""
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, value)}
        inputType="hour"
      />
      :
      <DateInput
        value=""
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, value)}
        inputType="minute"
      />
    </StyledPicker>
  );
};

DatePicker.propTypes = {
  status: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

const EditEvent = () => {
  const [eventInfo, setEventInfo] = useState({
    title: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    requiredItems: '',
    memberNumber: '',
    content: '',
  });
  const { infoData, error } = useContext(EventInfoContext);

  useEffect(() => {
    if (infoData) {
      setEventInfo({
        title: infoData.title || '',
        startDateTime: infoData.start || '',
        endDateTime: infoData.end || '',
        location: infoData.location || '',
        requiredItems: infoData.requiredItems || '',
        memberNumber: infoData.memberNumber || '',
        content: infoData.content || '',
      });
    }
  }, [infoData]);

  if (error) {
    return <div>error</div>;
  }

  console.log(infoData);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const editValue = (key, value) => {
    setEventInfo((prev) => ({ ...prev, [key]: value }));
  };

  const toKSTISOString = (date) => {
    const KST_OFFSET = 9 * 60;
    const kstDate = new Date(date.getTime() + KST_OFFSET * 60 * 1000);
    return kstDate.toISOString().replace('Z', '');
  };

  const onSave = async () => {
    const { title, content, startDateTime, endDateTime } = eventInfo;

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }

    if (startDateTime === endDateTime) {
      alert('시작 시간과 종료 시간은 같을 수 없습니다.');
      return;
    }

    if (startDateTime > endDateTime) {
      alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
      return;
    }

    const data = { ...eventInfo };
    data.startDateTime = toKSTISOString(new Date(startDateTime));
    data.endDateTime = toKSTISOString(new Date(endDateTime));

    if (window.confirm('저장하시겠습니까?')) {
      try {
        const response = await axios.post(`${BASE_URL}/admin/event`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
        });
        console.log(response);
        console.log(data);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledCreate>
      <Header
        title="일정 수정"
        text="완료"
        color="mainColor"
        onClick={onSave}
      />
      <InfoInput
        placeholder="제목"
        origValue={eventInfo.title}
        padding="15px"
        align="left"
        editValue={(value) => editValue('title', value)}
      />
      <DatePickerWrapper>
        <DatePicker
          status="start"
          onDateChange={(index, value) => {
            const newDate = new Date(eventInfo.startDateTime);
            if (index === 0) newDate.setFullYear(value);
            if (index === 1) newDate.setMonth(value - 1);
            if (index === 2) newDate.setDate(value);
            if (index === 3) newDate.setHours(value);
            if (index === 4) newDate.setMinutes(value);
            editValue('startDateTime', newDate);
          }}
        />
        <DatePicker
          status="end"
          onDateChange={(index, value) => {
            const newDate = new Date(eventInfo.endDateTime);
            if (index === 0) newDate.setFullYear(value);
            if (index === 1) newDate.setMonth(value - 1);
            if (index === 2) newDate.setDate(value);
            if (index === 3) newDate.setHours(value);
            if (index === 4) newDate.setMinutes(value);
            editValue('endDateTime', newDate);
          }}
        />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue={eventInfo.location}
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('location', value)}
      />
      <InfoInput
        text="준비물"
        origValue={eventInfo.requiredItems}
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('requiredItems', value)}
      />
      <InfoInput
        text="총인원"
        origValue={eventInfo.memberNumber}
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('memberNumber', value)}
      />
      <StyledTextArea
        placeholder="내용"
        value={eventInfo.content}
        onChange={(e) => editValue('content', e.target.value)}
      />
    </StyledCreate>
  );
};

export default EditEvent;
