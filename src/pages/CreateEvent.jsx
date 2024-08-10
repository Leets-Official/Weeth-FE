/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import theme from '../styles/theme';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';
import DatePicker from '../components/Calendar/DatePicker';
import { replaceNewLines } from '../hooks/Utils';
import { createEvent } from '../hooks/EventAdminAPI';

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

const CreateEvent = () => {
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'start', value: getValue('start') },
    { key: 'end', value: [] },
    { key: 'location', value: '' },
    { key: 'requiredItem', value: '' },
    { key: 'memberCount', value: '' },
    { key: 'content', value: '' },
  ]);

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
    const title = eventInfo.find((item) => item.key === 'title').value;
    const location = eventInfo.find((item) => item.key === 'location').value;
    const requiredItem = eventInfo.find(
      (item) => item.key === 'requiredItem',
    ).value;
    const memberCount = eventInfo.find(
      (item) => item.key === 'memberCount',
    ).value;
    let content = eventInfo.find((item) => item.key === 'content').value;

    // 엔터를 \n으로 치환
    content = replaceNewLines(content);

    // 작성한 내용 저장
    const data = eventInfo.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    // 시간 배열을 ISO 형식으로 변환하는 함수
    const dateArrayToKSTISO = (dateArray) => {
      if (dateArray.length === 5) {
        const [year, month, day, hour, minute] = dateArray;
        const dateObj = new Date(year, month - 1, day, hour, minute);

        // 대한민국 표준시(KST)는 UTC보다 9시간 빠릅니다.
        const KST_OFFSET = 9 * 60; // 9시간을 분 단위로 변환
        // UTC 시간을 KST로 변환
        const kstDate = new Date(dateObj.getTime() + KST_OFFSET * 60 * 1000);
        // 변환된 KST 시간을 ISO 문자열로 반환
        return kstDate.toISOString().replace('Z', '');
      }
      return '';
    };

    // 시간 배열로 저장
    const startDate = eventInfo.find((item) => item.key === 'start').value;
    const endDate = eventInfo.find((item) => item.key === 'end').value;

    data.start = dateArrayToKSTISO(startDate);
    data.end = dateArrayToKSTISO(endDate);

    console.log(data.start);
    console.log(data.end);

    // 모든 항목이 비어 있는지 확인
    if (
      !title.trim() &&
      !location.trim() &&
      !requiredItem.trim() &&
      !memberCount.trim() &&
      !content.trim()
    ) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    // 시간 유효성 검사
    if (!data.start) {
      alert('시작 시간을 입력해주세요.');
      return;
    }

    if (!data.end) {
      alert('종료 시간을 입력해주세요.');
      return;
    }

    if (data.start === data.end) {
      alert('시작 시간과 종료 시간은 같을 수 없습니다.');
      return;
    }

    if (data.start > data.end) {
      alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
      return;
    }

    // 각각의 필드에 대해 빈칸이 있는지 확인
    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    if (!location.trim()) {
      alert('장소를 입력해 주세요.');
      return;
    }

    if (!requiredItem.trim()) {
      alert('준비물을 입력해 주세요.');
      return;
    }

    if (!memberCount.trim()) {
      alert('총인원을 입력해 주세요.');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    if (window.confirm('저장하시겠습니까?')) {
      try {
        const response = await createEvent(data);
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
              ...eventInfo.find((item) => item.key === 'start').value,
            ];
            startDate[index] = value;
            editDate('start', startDate);
          }}
        />
        <DatePicker
          status="end"
          onDateChange={(index, value) => {
            const endDate = [
              ...eventInfo.find((item) => item.key === 'end').value,
            ];
            endDate[index] = value;
            editDate('end', endDate);
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
          eventInfo.find((item) => item.key === 'requiredItem')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('requiredItem', value)}
      />
      <InfoInput
        text="총인원"
        origValue={
          eventInfo.find((item) => item.key === 'memberCount')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('memberCount', value)}
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
