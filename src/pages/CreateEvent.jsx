import { useState } from 'react';
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

// 글 작성 시 페이지에 진입한 시각을 기본 시작 시간으로
const today = new Date();
const getValue = (status) => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const valueArr = [year, month, day, hour, minute];

  return status === 'start' ? valueArr : [];
};

// status가 start라면 위에서 가져온 현재 시각을 미리 입력,
// 아니라면 비워두기
const DatePicker = ({ status, onDateChange }) => {
  const now = getValue(status);

  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={status === 'start' ? now[0] : ''}
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, value)}
      />
      년
      <DateInput
        value={status === 'start' ? now[1] : ''}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, value)}
      />
      월
      <DateInput
        value={status === 'start' ? now[2] : ''}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, value)}
      />
      일
      <DateInput
        value={status === 'start' ? now[3] : ''}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, value)}
      />
      :
      <DateInput
        value={status === 'start' ? now[4] : ''}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, value)}
      />
    </StyledPicker>
  );
};

DatePicker.propTypes = {
  status: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

const CreateEvent = () => {
  // 서버로 넘겨줄 데이터
  // 아무것도 입력하지 않으면 공란이지만 시작날짜의 경우만 현재시각의 초기값을 가짐
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'startDateTime', value: getValue('start') },
    { key: 'endDateTime', value: [] },
    { key: 'location', value: '' },
    { key: 'requiredItems', value: '' },
    { key: 'memberNumber', value: '' },
    { key: 'content', value: '' },
  ]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const editValue = (key, value) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const editDate = (key, date) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value: date } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const onSave = async () => {
    if (window.confirm('저장하시겠습니까?')) {
      try {
        const data = eventInfo.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        const startDate = eventInfo.find(
          (item) => item.key === 'startDateTime',
        ).value;
        const endDate = eventInfo.find(
          (item) => item.key === 'endDateTime',
        ).value;

        if (startDate.length === 5) {
          const [startYear, startMonth, startDay, startHour, startMinute] =
            startDate;
          const startDateObj = new Date(
            startYear,
            startMonth - 1,
            startDay,
            startHour,
            startMinute,
          );
          data.startDateTime = startDateObj.toISOString();
        } else {
          data.startDateTime = '';
        }

        if (endDate.length === 5) {
          const [endYear, endMonth, endDay, endHour, endMinute] = endDate;
          const endDateObj = new Date(
            endYear,
            endMonth - 1,
            endDay,
            endHour,
            endMinute,
          );
          data.endDateTime = endDateObj.toISOString();
        } else {
          data.endDateTime = '';
        }
        const response = await axios.post(
          'http://13.125.78.31:8080/admin/event',
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Authorization_refresh: `Bearer ${refreshToken}`,
            },
          },
        );
        console.log(data);
        console.log(response); // 서버의 응답을 콘솔에 출력
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        console.error(err); // 오류 내용을 콘솔에 출력
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledCreate>
      <Header
        title="일정 추가"
        text="완료"
        color="mainColor"
        onClick={onSave}
      />
      <InfoInput
        placeholder="제목"
        origValue={eventInfo.find((item) => item.key === 'title')?.value || ''}
        padding="15px"
        align="left"
        editValue={(value) => editValue('title', value)}
      />
      <DatePickerWrapper>
        <DatePicker
          status="start"
          onDateChange={(index, value) => {
            const startDate = [
              ...eventInfo.find((item) => item.key === 'startDateTime').value,
            ];
            startDate[index] = value;
            editDate('startDateTime', startDate);
          }}
        />
        <DatePicker
          status="end"
          onDateChange={(index, value) => {
            const endDate = [
              ...eventInfo.find((item) => item.key === 'endDateTime').value,
            ];
            endDate[index] = value;
            editDate('endDateTime', endDate);
          }}
        />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue={
          eventInfo.find((item) => item.key === 'location')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('location', value)}
      />
      <InfoInput
        text="준비물"
        origValue={
          eventInfo.find((item) => item.key === 'requiredItems')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('requiredItems', value)}
      />
      <InfoInput
        text="총인원"
        origValue={
          eventInfo.find((item) => item.key === 'memberNumber')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('memberNumber', value)}
      />
      <StyledTextArea
        placeholder="내용"
        value={eventInfo.find((item) => item.key === 'content')?.value || ''}
        onChange={(e) => editValue('content', e.target.value)}
      />
    </StyledCreate>
  );
};

export default CreateEvent;
