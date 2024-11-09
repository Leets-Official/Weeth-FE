/* eslint-disable no-alert */
import DatePicker from '@/components/Event/DatePicker';
import Header from '@/components/Header/Header';
import InfoInput from '@/components/MyPage/InfoInput';
import useCustomBack from '@/router/useCustomBack';
import { createEvent, editEvent } from '@/service/EventAdminAPI';
import { EventInfoContext } from '@/service/EventInfoContext';
import UserAPI from '@/service/UserAPI';
import { UserContext } from '@/service/UserContext';
import { replaceNewLines } from '@/service/Utils';
import * as S from '@/styles/event/EventEditor.styled';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ISOToArray = (isoString: string) => {
  if (!isoString) return [];
  const date = new Date(isoString);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

const dateArrayToKSTISO = (
  dateArray: [number, number, number, number, number],
) => {
  const [year, month, day, hour, minute] = dateArray;
  const dateObj = new Date(year, month - 1, day, hour, minute);
  const KST_OFFSET = 9 * 60;
  const kstDate = new Date(dateObj.getTime() + KST_OFFSET * 60 * 1000);
  return kstDate.toISOString().replace('Z', '');
};

const EventEditor = () => {
  useCustomBack('/calendar');

  const { infoData, error } = useContext(EventInfoContext);
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'start', value: [] },
    { key: 'end', value: [] },
    { key: 'location', value: '' },
    { key: 'requiredItem', value: '' },
    { key: 'memberCount', value: '' },
    { key: 'content', value: '' },
  ]);

  const [startArr, setStartArr] = useState(['', '', '', '', '']);
  const [endArr, setEndArr] = useState(['', '', '', '', '']);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { userData } = useContext(UserContext);

  const infoInputs = [
    { key: 'location', text: '장소' },
    { key: 'requiredItem', text: '준비물' },
    { key: 'memberCount', text: '총인원' },
  ];

  // start,end 배열 타입 변경 (number -> string)
  useEffect(() => {
    if (isEditMode && infoData) {
      const updatedEventInfo = eventInfo.map((item) => {
        if (item.key === 'start') {
          const startArray = ISOToArray(infoData.start).map((num) =>
            num.toString(),
          );
          setStartArr(startArray);
          return { ...item, value: startArray };
        }
        if (item.key === 'end') {
          const endArray = ISOToArray(infoData.end).map((num) =>
            num.toString(),
          );
          setEndArr(endArray);
          return { ...item, value: endArray };
        }
        return { ...item, value: infoData[item.key] || item.value };
      });
      setEventInfo(updatedEventInfo);
    }
  }, [isEditMode, infoData]);

  const editEventInfo = (key: string, value: any) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const onSave = async () => {
    const title: string | undefined = (() => {
      const value = eventInfo.find((item) => item.key === 'title')?.value;
      return typeof value === 'string' ? value : undefined;
    })();

    const location: string | undefined = (() => {
      const value = eventInfo.find((item) => item.key === 'location')?.value;
      return typeof value === 'string' ? value : undefined;
    })();

    const requiredItem: string | undefined = (() => {
      const value = eventInfo.find(
        (item) => item.key === 'requiredItem',
      )?.value;
      return typeof value === 'string' ? value : undefined;
    })();

    const memberCount: string | undefined = (() => {
      const value = eventInfo.find((item) => item.key === 'memberCount')?.value;
      return typeof value === 'string' ? value : undefined;
    })();

    let content = eventInfo.find((item) => item.key === 'content')?.value;
    content = typeof content === 'string' ? replaceNewLines(content) : '';

    const data = eventInfo.reduce((acc: any, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const startDate = eventInfo.find((item) => item.key === 'start')?.value;
    const endDate = eventInfo.find((item) => item.key === 'end')?.value;

    // TODO: start, end 초기값 설정 로직 추가 (오늘 00:00~23:59)
    if (
      Array.isArray(startDate) &&
      startDate.length === 5 &&
      startDate.every(Number.isFinite)
    ) {
      data.start = dateArrayToKSTISO(
        startDate as unknown as [number, number, number, number, number],
      );
    }

    if (
      Array.isArray(endDate) &&
      endDate.length === 5 &&
      endDate.every(Number.isFinite)
    ) {
      data.end = dateArrayToKSTISO(
        endDate as unknown as [number, number, number, number, number],
      );
    }

    function checkEmpty(field: string | undefined, message: string): boolean {
      // TODO🚨important!!🚨: 배열 내에 빈 값이 있는 경우를 처리하는 로직 추가
      if (Array.isArray(field) && field.length === 0) {
        alert(message);
        return true;
      }
      return false;
    }

    if (
      checkEmpty(title, '제목을 입력해 주세요.') ||
      checkEmpty(data.start, '시작 시간을 입력해 주세요.') ||
      checkEmpty(data.end, '종료 시간을 입력해 주세요.') ||
      checkEmpty(location, '장소를 입력해 주세요.') ||
      checkEmpty(requiredItem, '준비물을 입력해 주세요.') ||
      checkEmpty(memberCount, '총인원을 입력해 주세요.') ||
      checkEmpty(content, '내용을 입력해 주세요.')
    ) {
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

    if (window.confirm('저장하시겠습니까?')) {
      try {
        if (isEditMode) await editEvent(data, Number(id));
        else await createEvent(data);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err: any) {
        if (err.response.status === 403) {
          alert('일정 생성 및 수정은 운영진만 가능합니다.');
          return;
        }
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  if (error) {
    return null;
  }

  if (userData && userData.role !== 'ADMIN') {
    return <S.Error>일정 생성 및 수정은 운영진만 가능합니다</S.Error>;
  }

  return (
    <S.EventEditorWrapper>
      <UserAPI />
      <Header
        title={isEditMode ? '일정 수정' : '일정 추가'}
        text="완료"
        color="mainColor"
        onClick={onSave}
      />
      <InfoInput
        placeholder="제목"
        origValue={eventInfo.find((item) => item.key === 'title')?.value || ''}
        padding="15px"
        align="left"
        editValue={(value) => editEventInfo('title', value)}
      />
      <DatePicker
        startDate={startArr}
        endDate={endArr}
        onStartDateChange={(index, value) => {
          const updatedStartDate = [...startArr];
          updatedStartDate[index] = value.toString();
          setStartArr(updatedStartDate);
          editEventInfo('start', updatedStartDate);
        }}
        onEndDateChange={(index, value) => {
          const updatedEndDate = [...endArr];
          updatedEndDate[index] = value.toString();
          setEndArr(updatedEndDate);
          editEventInfo('end', updatedEndDate);
        }}
      />
      {infoInputs.map((input) => (
        <InfoInput
          key={input.key}
          text={input.text}
          origValue={
            eventInfo.find((item) => item.key === input.key)?.value || ''
          }
          width="75%"
          padding="15px"
          align="left"
          editValue={(value) => editEventInfo(input.key, value)}
        />
      ))}
      <S.TextAreaWrapper>
        <S.TextArea
          placeholder="내용"
          value={
            (eventInfo.find((item) => item.key === 'content')
              ?.value as string) || ''
          }
          onChange={(e) => editEventInfo('content', e.target.value)}
        />
      </S.TextAreaWrapper>
    </S.EventEditorWrapper>
  );
};

export default EventEditor;
